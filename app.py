from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# load model once at startup
analyzer = pipeline("sentiment-analysis", framework="pt")

@app.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = analyzer(text)[0]
    label = result["label"]
    score = round(result["score"], 2)
    sentiment = f"{label} ({score})"

    return jsonify({"sentiment": sentiment})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
