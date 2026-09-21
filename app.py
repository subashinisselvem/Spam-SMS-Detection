from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load trained machine learning model
model = joblib.load("model/spam_classifier.pkl")


@app.route("/")
def home():
    return "Spam SMS Detection Backend is Running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    message = data.get("message", "").strip()

    if not message:
        return jsonify({
            "error": "Please enter an SMS message."
        }), 400

    prediction = model.predict([message])[0]

    if prediction == 1:
        result = "SPAM"
    else:
        result = "HAM"

    return jsonify({
        "prediction": result
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)