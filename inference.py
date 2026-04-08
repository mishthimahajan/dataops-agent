import os
import requests

API_BASE_URL = os.getenv("API_BASE_URL", "https://mishthimahajan-dataops-agent.hf.space")
MODEL_NAME = os.getenv("MODEL_NAME", "baseline")
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise ValueError("HF_TOKEN is required")

def run():
    reset_response = requests.post(
        f"{API_BASE_URL}/reset",
        json={"task": "easy"},
        timeout=30
    )
    reset_response.raise_for_status()

    actions = [
        {"type": "clean_missing"},
        {"type": "convert_age"},
        {"type": "compute_avg_salary"}
    ]

    total_reward = 0.0

    for action in actions:
        step_response = requests.post(
            f"{API_BASE_URL}/step",
            json=action,
            timeout=30
        )
        step_response.raise_for_status()
        step_data = step_response.json()
        total_reward += float(step_data.get("reward", 0.0))

    return {
        "model_name": MODEL_NAME,
        "total_reward": total_reward
    }

if __name__ == "__main__":
    print(run())
