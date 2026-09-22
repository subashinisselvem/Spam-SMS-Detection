from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import os

app = Flask(__name__, static_folder="web")
CORS(app)

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

    return jsonify({
        "prediction": result,
        "confidence": round(confidence, 2)
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)