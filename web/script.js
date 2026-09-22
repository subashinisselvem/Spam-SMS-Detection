const HISTORY_KEY = "spamPredictionHistory";
const DARK_MODE_KEY = "spamDarkMode";


/* =========================
   CHARACTER COUNT
========================= */

function updateCharacterCount() {
    const message = document.getElementById("message");
    const characterCount = document.getElementById("characterCount");
    const messageHint = document.getElementById("messageHint");

    characterCount.textContent = message.value.length;

    if (message.value.length === 0) {
        messageHint.textContent = "Enter a message to begin.";
    } else if (message.value.length < 20) {
        messageHint.textContent = "Short message detected.";
    } else {
        messageHint.textContent = "Message ready for analysis.";
    }
}


/* =========================
   URL DETECTION
========================= */

function containsURL(message) {
    const urlPattern = /(https?:\/\/|www\.|bit\.ly|tinyurl\.com|t\.co\/|goo\.gl)/i;
    return urlPattern.test(message);
}


/* =========================
   PREDICTION EXPLANATION
========================= */

function getExplanation(prediction, message) {

    const hasURL = containsURL(message);

    if (prediction === "SPAM") {

        if (hasURL) {
            return "⚠️ This message was classified as spam. It also contains a link, which can be a warning sign in suspicious messages.";
        }

        return "⚠️ The Machine Learning model identified patterns commonly associated with spam messages.";
    }

    if (hasURL) {
        return "ℹ️ The message was classified as not spam, but it contains a link. Always verify links before opening them.";
    }

    return "✅ The Machine Learning model classified this message as a normal message.";
}


/* =========================
   CHECK MESSAGE
========================= */

async function checkMessage() {

    const messageInput = document.getElementById("message");
    const result = document.getElementById("result");
    const resultText = document.getElementById("resultText");
    const confidenceValue = document.getElementById("confidenceValue");
    const confidenceFill = document.getElementById("confidenceFill");
    const resultIcon = document.querySelector(".result-icon");
    const explanation = document.getElementById("explanation");
    const urlWarning = document.getElementById("urlWarning");

    const message = messageInput.value.trim();

    /* Empty message */

    if (!message) {

        result.style.display = "block";

        result.style.backgroundColor = "#fff3cd";
        result.style.borderColor = "#ffe69c";

        resultIcon.textContent = "⚠️";

        resultText.textContent = "Please enter an SMS message.";
        resultText.style.color = "#856404";

        explanation.textContent = "";
        urlWarning.textContent = "";

        confidenceValue.textContent = "—%";
        confidenceFill.style.width = "0%";

        return;
    }


    /* Loading state */

    result.style.display = "block";

    result.style.backgroundColor = "var(--soft)";
    result.style.borderColor = "var(--border)";

    resultIcon.textContent = "🔄";

    resultText.textContent = "Checking your message...";
    resultText.style.color = "var(--text)";

    explanation.textContent = "";
    urlWarning.textContent = "";

    confidenceValue.textContent = "—%";
    confidenceFill.style.width = "0%";


    try {

        const response = await fetch("/predict", {

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


        /* =========================
           SPAM RESULT
        ========================= */

        if (data.prediction === "SPAM") {

            resultIcon.textContent = "🚨";

            resultText.textContent = "SPAM MESSAGE";

            resultText.style.color = "#d60000";

            result.style.backgroundColor = "#ffe5e5";
            result.style.borderColor = "#ffb8b8";

        }


        /* =========================
           HAM RESULT
        ========================= */

        else {

            resultIcon.textContent = "✅";

            resultText.textContent = "HAM — NOT SPAM";

            resultText.style.color = "#008a20";

            result.style.backgroundColor = "#e5ffe9";
            result.style.borderColor = "#a8e6b5";
        }


        /* Confidence */

        confidenceValue.textContent = `${confidence}%`;

        confidenceFill.style.width = `${confidence}%`;


        /* Explanation */

        explanation.textContent = getExplanation(
            data.prediction,
            message
        );


        /* URL warning */

        if (containsURL(message)) {

            urlWarning.textContent =
                "🔗 Link detected — verify the sender before opening it.";

            urlWarning.style.color = "#b06a00";

        } else {

            urlWarning.textContent = "";
        }


        /* Save prediction */

        savePrediction(
            message,
            data.prediction,
            confidence
        );


        /* Update dashboard */

        updateDashboard();

    }


    catch (error) {

        console.error(error);

        resultIcon.textContent = "❌";

        resultText.textContent =
            "Unable to connect to the server.";

        resultText.style.color = "#856404";

        explanation.textContent =
            "Make sure the Flask backend is running on port 5000.";

        urlWarning.textContent = "";

        result.style.backgroundColor = "#fff3cd";
        result.style.borderColor = "#ffe69c";

        confidenceValue.textContent = "—%";

        confidenceFill.style.width = "0%";
    }
}


/* =========================
   SAVE HISTORY
========================= */

function savePrediction(message, prediction, confidence) {

    const history = getHistory();

    const newPrediction = {

        message: message,

        prediction: prediction,

        confidence: confidence,

        time: new Date().toLocaleString()
    };


    history.unshift(newPrediction);


    /* Keep latest 50 predictions */

    if (history.length > 50) {
        history.splice(50);
    }


    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );
}


/* =========================
   GET HISTORY
========================= */

function getHistory() {

    try {

        const history = localStorage.getItem(HISTORY_KEY);

        return history ? JSON.parse(history) : [];

    } catch (error) {

        console.error("History error:", error);

        return [];
    }
}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {

    const history = getHistory();

    const total = history.length;

    const spam = history.filter(
        item => item.prediction === "SPAM"
    ).length;

    const ham = history.filter(
        item => item.prediction === "HAM"
    ).length;


    /* Statistics */

    document.getElementById("totalCount").textContent = total;

    document.getElementById("spamCount").textContent = spam;

    document.getElementById("hamCount").textContent = ham;


    /* Percentages */

    let spamPercentage = 0;
    let hamPercentage = 0;


    if (total > 0) {

        spamPercentage =
            Math.round((spam / total) * 100);

        hamPercentage =
            Math.round((ham / total) * 100);
    }


    document.getElementById("spamPercentage").textContent =
        `${spamPercentage}%`;

    document.getElementById("hamPercentage").textContent =
        `${hamPercentage}%`;


    document.getElementById("spamChartFill").style.width =
        `${spamPercentage}%`;

    document.getElementById("hamChartFill").style.width =
        `${hamPercentage}%`;


    /* History */

    displayHistory(history);
}


/* =========================
   DISPLAY HISTORY
========================= */

function displayHistory(history) {

    const historyList =
        document.getElementById("historyList");


    if (history.length === 0) {

        historyList.innerHTML = `
            <p class="no-history">
                No prediction history yet.
            </p>
        `;

        return;
    }


    historyList.innerHTML = history
        .map((item, index) => {

            const resultClass =
                item.prediction === "SPAM"
                    ? "history-spam"
                    : "history-ham";


            const icon =
                item.prediction === "SPAM"
                    ? "🚨"
                    : "✅";


            return `
                <div class="history-item">

                    <div class="history-top">

                        <span class="history-result ${resultClass}">
                            ${icon} ${item.prediction}
                        </span>

                        <span>
                            ${item.confidence}%
                        </span>

                    </div>

                    <div class="history-message">
                        ${escapeHTML(item.message)}
                    </div>

                    <div class="history-meta">
                        ${item.time}
                    </div>

                </div>
            `;

        })
        .join("");
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================
   CLEAR HISTORY
========================= */

function clearHistory() {

    const history = getHistory();

    if (history.length === 0) {
        alert("There is no prediction history to clear.");
        return;
    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear all prediction history?"
        );


    if (!confirmClear) {
        return;
    }


    localStorage.removeItem(HISTORY_KEY);

    updateDashboard();
}


/* =========================
   EXPORT CSV
========================= */

function exportHistory() {

    const history = getHistory();


    if (history.length === 0) {

        alert("No prediction history available to export.");

        return;
    }


    let csv =
        "Message,Prediction,Confidence,Date\n";


    history.forEach(item => {

        const message =
            `"${String(item.message).replace(/"/g, '""')}"`;

        const prediction =
            `"${item.prediction}"`;

        const confidence =
            `"${item.confidence}%"`;

        const time =
            `"${item.time}"`;


        csv +=
            `${message},${prediction},${confidence},${time}\n`;
    });


    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "spam_prediction_history.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);
}


/* =========================
   DARK MODE
========================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        DARK_MODE_KEY,
        isDark ? "true" : "false"
    );


    updateThemeButton();
}


/* =========================
   UPDATE THEME BUTTON
========================= */

function updateThemeButton() {

    const button =
        document.getElementById("themeButton");


    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        button.textContent = "☀️ Light Mode";

    } else {

        button.textContent = "🌙 Dark Mode";
    }
}


/* =========================
   LOAD DARK MODE
========================= */

function loadDarkMode() {

    const darkMode =
        localStorage.getItem(DARK_MODE_KEY);


    if (darkMode === "true") {

        document.body.classList.add("dark-mode");
    }


    updateThemeButton();
}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener("DOMContentLoaded", function () {

    updateCharacterCount();

    loadDarkMode();

    updateDashboard();

});