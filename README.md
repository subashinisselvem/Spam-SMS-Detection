# 📱 Spam SMS Detection using Machine Learning

## 📌 Project Overview

Spam SMS Detection is a machine learning project that classifies SMS messages as **SPAM** or **HAM (Not Spam)**.

The project uses Natural Language Processing (NLP), TF-IDF text vectorization, and Logistic Regression. It also includes a Flask backend and a simple web interface for real-time prediction.

## 🎯 Objective

The main objectives are:

- Detect unwanted and fraudulent SMS messages.
- Classify messages as Spam or Ham.
- Display prediction confidence.
- Provide a simple web interface for users.
- Store prediction history locally.
- Show prediction statistics.
- Detect suspicious URLs in messages.

## 🛠️ Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- TF-IDF
- Logistic Regression
- Joblib
- Flask
- Flask-CORS
- HTML
- CSS
- JavaScript
- LocalStorage
- Git & GitHub

## 🧠 Machine Learning Approach

The project follows these steps:

```text
SMS Dataset
     ↓
Data Preprocessing
     ↓
TF-IDF Vectorization
     ↓
Train-Test Split
     ↓
Logistic Regression
     ↓
Model Evaluation
     ↓
Prediction
```
📊 Dataset

The project uses the UCI SMS Spam Collection dataset.

Category	Count
Total Messages	5,572
Ham Messages	4,825
Spam Messages	747
🔤 TF-IDF Vectorization

TF-IDF converts text messages into numerical features.

Configuration:

lowercase = True
stop_words = English
max_features = 5000
🤖 Machine Learning Model

The project uses Logistic Regression for classification.

Training configuration:

Train-test split: 80/20
Random state: 42
Stratified split
Maximum iterations: 1000
📈 Model Performance

Accuracy: 97.04%

Classification Report
              precision    recall  f1-score   support

         Ham       0.97      1.00      0.98       966
        Spam       1.00      0.78      0.88       149

    accuracy                           0.97      1115
   macro avg       0.98      0.89      0.93      1115
weighted avg       0.97      0.97      0.97      1115
Confusion Matrix
[[966   0]
 [ 33 116]]
🌐 Web Application

The project includes a Flask backend and a responsive web interface.

Workflow
User enters SMS
       ↓
Frontend sends message to Flask API
       ↓
TF-IDF + Logistic Regression
       ↓
Prediction
       ↓
SPAM / HAM + Confidence
       ↓
Result displayed
✨ Features
Spam/Ham Prediction
Prediction Confidence
Prediction History
Clear History
Prediction Statistics
Spam vs Ham Overview
CSV Export
Dark Mode
Suspicious URL Detection
🧪 Example Predictions
Spam Example
Congratulations! You have won a free iPhone. Click here now to claim your prize!

Result: SPAM

Ham Example
Hey, are you coming to college tomorrow?

Result: HAM (Not Spam)

🖼️ Project Screenshot

📁 Project Structure
Spam SMS Detection
│
├── dataset
│   └── SMSSpamCollection
│
├── model
│   └── spam_classifier.pkl
│
├── screenshots
│   └── spam-detection-demo.png
│
├── web
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── venv
├── app.py
├── train_model.py
├── predict.py
├── requirements.txt
├── README.md
└── .gitignore
⚙️ Installation
1. Clone the repository
git clone https://github.com/subashinisselvem/Spam-SMS-Detection.git
cd Spam-SMS-Detection
2. Create virtual environment
python -m venv venv
3. Activate virtual environment
.\venv\Scripts\activate
4. Install dependencies
pip install -r requirements.txt
🏋️ Train the Model
python train_model.py

The trained model will be saved as:

model/spam_classifier.pkl
💻 Command-Line Prediction
python predict.py

Enter an SMS message when prompted.

🚀 Run the Web Application

Start the Flask backend:

python app.py

The backend runs at:

http://127.0.0.1:5000

Then open:

web/index.html
🔌 API Endpoint
POST /predict

Example request:

{
  "message": "Congratulations! You won a free prize!"
}

Example response:

{
  "prediction": "SPAM",
  "confidence": 76.64
}
🔐 Privacy

Prediction history is stored locally in the browser using LocalStorage.

The project is intended for educational and demonstration purposes.

🔮 Future Improvements
Deep learning models such as LSTM or BERT
Larger and more recent SMS datasets
Better detection of obfuscated spam
Explainable AI
Cloud deployment
User authentication
Database-based prediction history
Multilingual SMS detection
📌 Project Status

Completed

The project currently supports:

Machine learning model training
Spam/Ham prediction
Flask API
Web interface
Prediction confidence
Prediction history
Statistics
CSV export
Dark mode
Suspicious URL detection
GitHub version control