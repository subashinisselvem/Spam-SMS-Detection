import joblib


# Load trained model
model = joblib.load("model/spam_classifier.pkl")


print("===================================")
print("      SPAM SMS DETECTION")
print("===================================")
print("Type an SMS message to check.")
print("Type 'exit' to stop.\n")


while True:
    message = input("Enter SMS: ")

    if message.lower() == "exit":
        print("Program stopped.")
        break

    if not message.strip():
        print("Please enter a message.\n")
        continue

    prediction = model.predict([message])[0]

    if prediction == 1:
        print("🚨 Result: SPAM\n")
    else:
        print("✅ Result: HAM (Not Spam)\n")