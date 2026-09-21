# 📱 Spam SMS Detection

## 📌 Project Overview

Spam SMS Detection is a Machine Learning project that classifies SMS messages as either **Spam** or **Ham (Not Spam)**.

The project uses Natural Language Processing (NLP) techniques and a Machine Learning classification algorithm to identify unwanted or fraudulent SMS messages.

The project also includes a web-based interface that allows users to enter an SMS message and receive a prediction from the trained machine learning model.

## 🎯 Objective

The main objective of this project is to build an AI-based system that can automatically detect whether an SMS message is spam or legitimate.

## 🛠️ Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- TF-IDF
- Logistic Regression
- Joblib
- Matplotlib
- Seaborn
- Flask
- Flask-CORS
- HTML
- CSS
- JavaScript

## 🤖 Machine Learning Approach

The system follows these steps:

1. Load the SMS dataset
2. Prepare the data
3. Convert text into numerical features using TF-IDF
4. Split the dataset into training and testing data
5. Train a Logistic Regression classifier
6. Evaluate the model
7. Save the trained model
8. Predict whether new SMS messages are Spam or Ham
9. Connect the trained model to a Flask backend
10. Provide predictions through a web interface

## 📊 Dataset

The project uses the **SMS Spam Collection** dataset.

The dataset contains:

- 5,572 SMS messages
- Ham messages
- Spam messages

## 📈 Model Performance

The trained model achieved:

**Accuracy: 97.04%**

Test set:

- Training messages: 4,457
- Testing messages: 1,115

### Classification Results

| Class | Precision | Recall | F1-Score |
|---|---:|---:|---:|
| Ham | 0.97 | 1.00 | 0.98 |
| Spam | 1.00 | 0.78 | 0.88 |

### Confusion Matrix

```text
[[966   0]
 [ 33 116]]
```

The model achieved high overall accuracy, while spam recall indicates that some spam messages were not detected.

## 🔍 Example Predictions

### Spam Message

> Congratulations! You have won a free iPhone. Click here now to claim your prize!

**Prediction: SPAM 🚨**

### Normal Message

> Hey, are you coming to college tomorrow?

**Prediction: HAM (Not Spam) ✅**

## 🌐 Web Application

The project includes a web-based interface built using **HTML, CSS, JavaScript, and Flask**.

### Web Application Features

- Enter an SMS message through the web interface
- Send the message to the Flask backend
- Use the trained machine learning model for prediction
- Display the result as SPAM or HAM
- Simple and user-friendly interface

### Web Application Workflow

```text
User enters SMS
      ↓
Web Interface
      ↓
Flask Backend
      ↓
Trained ML Model
      ↓
Spam / Ham Prediction
      ↓
Result displayed to User
```

### Run the Web Application

1. Activate the virtual environment:

```powershell
.\venv\Scripts\activate
```

2. Start the Flask backend:

```powershell
python app.py
```

3. Keep the Flask terminal running.

4. Open `web/index.html` using **Live Server** in VS Code.

5. Enter an SMS message and click **Check Message**.

The Flask backend runs at:

```text
http://127.0.0.1:5000
```

## 📁 Project Structure

```text
Spam SMS Detection
│
├── dataset
│   └── SMSSpamCollection
│
├── model
│   └── spam_classifier.pkl
│
├── screenshots
│
├── web
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── venv
│
├── app.py
├── train_model.py
├── predict.py
├── requirements.txt
├── README.md
└── .gitignore
```

## ▶️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/subashinisselvem/Spam-SMS-Detection.git
```

### 2. Open the Project

```bash
cd Spam-SMS-Detection
```

### 3. Create Virtual Environment

```bash
python -m venv venv
```

### 4. Activate Virtual Environment

Windows PowerShell:

```powershell
.\venv\Scripts\activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Train the Model

```bash
python train_model.py
```

### 7. Run Terminal Prediction

```bash
python predict.py
```

### 8. Run the Web Application

Start the Flask backend:

```bash
python app.py
```

Then open:

```text
web/index.html
```

using Live Server.

## 📸 Project Screenshots

Screenshots of the working web application are stored in the `screenshots` folder.

## 🚀 Future Improvements

- Improve spam recall
- Add more training data
- Add probability/confidence scores
- Try additional machine learning algorithms
- Improve the user interface
- Deploy the web application online
- Add support for multiple languages
- Explore real-time SMS classification

## 📌 Project Status

**Completed ✅**

The machine learning model has been trained and tested successfully with an accuracy of **97.04%**.

The project also includes a working **Flask backend and web-based SMS spam detection interface**.