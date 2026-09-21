function updateCharacterCount() {
    const message = document.getElementById("message");
    const characterCount = document.getElementById("characterCount");

    characterCount.textContent = message.value.length;
}


async function checkMessage() {
    const messageInput = document.getElementById("message");
    const result = document.getElementById("result");
    const resultText = document.getElementById("resultText");
    const confidenceValue = document.getElementById("confidenceValue");
    const confidenceFill = document.getElementById("confidenceFill");
    const resultIcon = document.querySelector(".result-icon");

    const message = messageInput.value.trim();

    if (!message) {
        result.style.display = "block";
        result.style.backgroundColor = "#fff3cd";
        result.style.borderColor = "#ffe69c";

        resultIcon.textContent = "⚠️";
        resultText.textContent = "Please enter an SMS message.";
        resultText.style.color = "#856404";

        confidenceValue.textContent = "—%";
        confidenceFill.style.width = "0%";

        return;
    }

    result.style.display = "block";
    result.style.backgroundColor = "#f7f8ff";
    result.style.borderColor = "#e2e4ff";

    resultIcon.textContent = "🔄";
    resultText.textContent = "Checking your message...";
    resultText.style.color = "#555";

    confidenceValue.textContent = "—%";
    confidenceFill.style.width = "0%";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Server error");
        }

        const confidence = Number(data.confidence);

        if (data.prediction === "SPAM") {
            resultIcon.textContent = "🚨";
            resultText.textContent = "SPAM MESSAGE";
            resultText.style.color = "#d60000";

            result.style.backgroundColor = "#ffe5e5";
            result.style.borderColor = "#ffb8b8";
        } else {
            resultIcon.textContent = "✅";
            resultText.textContent = "HAM — NOT SPAM";
            resultText.style.color = "#008a20";

            result.style.backgroundColor = "#e5ffe9";
            result.style.borderColor = "#a8e6b5";
        }

        confidenceValue.textContent = `${confidence}%`;
        confidenceFill.style.width = `${confidence}%`;

    } catch (error) {
        console.error(error);

        resultIcon.textContent = "❌";
        resultText.textContent = "Unable to connect to the server.";
        resultText.style.color = "#856404";

        result.style.backgroundColor = "#fff3cd";
        result.style.borderColor = "#ffe69c";

        confidenceValue.textContent = "—%";
        confidenceFill.style.width = "0%";
    }
}