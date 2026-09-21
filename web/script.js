async function checkMessage() {
    const messageInput = document.getElementById("message");
    const result = document.getElementById("result");

    const message = messageInput.value.trim();

    if (!message) {
        result.style.display = "block";
        result.textContent = "⚠️ Please enter an SMS message.";
        return;
    }

    result.style.display = "block";
    result.textContent = "🔄 Checking message...";

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

        if (data.prediction === "SPAM") {
            result.textContent = "🚨 SPAM MESSAGE";
            result.style.backgroundColor = "#ffe5e5";
            result.style.color = "#d60000";
        } else {
            result.textContent = "✅ HAM — NOT SPAM";
            result.style.backgroundColor = "#e5ffe9";
            result.style.color = "#008a20";
        }

    } catch (error) {
        console.error(error);

        result.textContent = "❌ Unable to connect to the server.";
        result.style.backgroundColor = "#fff3cd";
        result.style.color = "#856404";
    }
}