import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


# ==========================================
# 1. Load Dataset
# ==========================================

data_path = "dataset/SMSSpamCollection"

data = pd.read_csv(
    data_path,
    sep="\t",
    header=None,
    names=["label", "message"],
    encoding="latin-1"
)

print("Dataset loaded successfully!")
print(f"Total messages: {len(data)}")


# ==========================================
# 2. Convert Labels
# ham  = 0
# spam = 1
# ==========================================

data["label"] = data["label"].map({
    "ham": 0,
    "spam": 1
})


# ==========================================
# 3. Separate Features and Target
# ==========================================

X = data["message"]
y = data["label"]


# ==========================================
# 4. Split Dataset
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print(f"Training messages: {len(X_train)}")
print(f"Testing messages: {len(X_test)}")


# ==========================================
# 5. Create TF-IDF + Logistic Regression Model
# ==========================================

model = Pipeline([
    ("tfidf", TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        max_features=5000
    )),
    ("classifier", LogisticRegression(
        max_iter=1000
    ))
])


# ==========================================
# 6. Train Model
# ==========================================

print("\nTraining model...")

model.fit(X_train, y_train)

print("Model training completed!")


# ==========================================
# 7. Make Predictions
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# 8. Evaluate Model
# ==========================================

accuracy = accuracy_score(y_test, y_pred)

print("\n===================================")
print("MODEL EVALUATION")
print("===================================")

print(f"Accuracy: {accuracy * 100:.2f}%")

print("\nClassification Report:")
print(classification_report(
    y_test,
    y_pred,
    target_names=["Ham", "Spam"]
))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# ==========================================
# 9. Save Trained Model
# ==========================================

model_path = "model/spam_classifier.pkl"

joblib.dump(model, model_path)

print("\n===================================")
print("MODEL SAVED SUCCESSFULLY!")
print("===================================")
print(f"Saved to: {model_path}")