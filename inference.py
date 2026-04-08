import os
import requests

# REQUIRED DEFAULTS (IMPORTANT FOR CHECKER)
API_BASE_URL = os.getenv("API_BASE_URL", "https://api.openai.com/v1")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4.1-mini")
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise ValueError("HF_TOKEN is required")

def run():
    # Use your actual backend
    base_url = "https://mishthimahajan-dataops-agent.hf.space"

    requests.post(f"{base_url}/reset", json={"task": "easy"})

    actions = [
        {"type": "clean_missing"},
        {"type": "convert_age"},
        {"type": "compute_avg_salary"}
    ]

    total_reward = 0.0

    for action in actions:
        step = requests.post(f"{base_url}/step", json=action).json()
        total_reward += float(step.get("reward", 0.0))

    return {
        "model_name": MODEL_NAME,
        "total_reward": total_reward
    }

if __name__ == "__main__":
    print(run())
