# Spam SMS Detection

## 📌 Project Overview

Spam SMS Detection is a Machine Learning project that classifies SMS messages as either **Spam** or **Ham (Not Spam)**.

The project uses Natural Language Processing (NLP) techniques and a Machine Learning classification algorithm to identify unwanted or fraudulent SMS messages.

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

## 🤖 Machine Learning Approach

The system follows these steps:

1. Load the SMS dataset
2. Clean and prepare the data
3. Convert text into numerical features using TF-IDF
4. Split the dataset into training and testing data
5. Train a Logistic Regression classifier
6. Evaluate the model
7. Save the trained model
8. Predict whether new SMS messages are Spam or Ham

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

## 🔍 Example Predictions

### Spam Message

> Congratulations! You have won a free iPhone. Click here now to claim your prize!

**Prediction: SPAM 🚨**

### Normal Message

> Hey, are you coming to college tomorrow?

**Prediction: HAM (Not Spam) ✅**

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
├── venv
│
├── train_model.py
├── predict.py
├── requirements.txt
└── README.md```

## ▶️ How to Run

### 1. Create Virtual Environment

```bash
python -m venv venv
```

### 2. Activate Virtual Environment

Windows PowerShell:

```powershell
.\venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Train the Model

```bash
python train_model.py
```

### 5. Run SMS Prediction

```bash
python predict.py
```

## 🚀 Future Improvements

- Build a web-based user interface
- Add real-time SMS classification
- Improve spam recall
- Add more training data
- Deploy the model as a web application
- Add probability/confidence scores

## 📌 Project Status

**Completed**

The machine learning model has been trained and tested successfully with an accuracy of **97.04%**.