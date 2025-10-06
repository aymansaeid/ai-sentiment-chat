from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

# Add this root route
@app.route("/")
def home():
    return jsonify({
        "message": "Flask Sentiment Analysis API is running!",
        "endpoints": {
            "analyze": "POST /analyze with JSON: {'text': 'your text here'}"
        }
    })

@app.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0:
        label = "POSITIVE"
    elif polarity < 0:
        label = "NEGATIVE"
    else:
        label = "NEUTRAL"

    return jsonify({"sentiment": f"{label} ({round(polarity,2)})"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)