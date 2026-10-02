from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import os
from supabase import create_client

app = Flask(__name__, static_folder="web")
CORS(app)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load trained machine learning model
model = joblib.load("model/spam_classifier.pkl")


@app.route("/")
def home():
    return send_from_directory("web", "index.html")


@app.route("/<path:path>")
def serve_frontend(path):
    file_path = os.path.join("web", path)

    if os.path.isfile(file_path):
        return send_from_directory("web", path)

    return send_from_directory("web", "index.html")


@app.route("/history", methods=["GET"])
def history():

    response = (
        supabase
        .table("predictions")
        .select("message, prediction, confidence, created_at")
        .order("created_at", desc=True)
        .limit(50)
        .execute()
    )

    history = []

    for item in response.data:

        history.append({
            "message": item["message"],
            "prediction": item["prediction"],
            "confidence": item["confidence"],
            "time": item["created_at"]
        })

    return jsonify({
        "history": history
    })


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "error": "Please enter an SMS message."
        }), 400

    # Make prediction
    prediction = model.predict([message])[0]

    # Calculate confidence
    probabilities = model.predict_proba([message])[0]
    confidence = max(probabilities) * 100

    if prediction == 1:
        result = "SPAM"
    else:
        result = "HAM"

    # Save prediction to Supabase
    supabase.table("predictions").insert({
        "message": message,
        "prediction": result,
        "confidence": round(confidence, 2)
    }).execute()

    return jsonify({
        "prediction": result,
        "confidence": round(confidence, 2)
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)