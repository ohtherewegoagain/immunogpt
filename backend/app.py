from flask import Flask, request, jsonify
import torch
from utils.predictor import run_model

app = Flask(__name__)

# Load models
models = {
    "mol": torch.load("models/immunogpt_mol.pth", map_location="cpu"),
    "tcr": torch.load("models/immunogpt_tcr.pth", map_location="cpu"),
    "vax": torch.load("models/immunogpt_vax.pth", map_location="cpu"),
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    model_type = data.get("model")
    input_data = data.get("input")

    if model_type not in models:
        return jsonify({"error": "Invalid model type"}), 400

    result = run_model(models[model_type], input_data)
    return jsonify({"output": result})

if __name__ == "__main__":
    app.run(debug=True)
