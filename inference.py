import os
import requests

API_BASE_URL = os.getenv("API_BASE_URL", "https://mishthimahajan-dataops-agent.hf.space")
MODEL_NAME = os.getenv("MODEL_NAME", "baseline")

def run():
    requests.post(f"{API_BASE_URL}/reset", json={"task": "easy"})

    actions = [
        {"type": "clean_missing"},
        {"type": "convert_age"},
        {"type": "compute_avg_salary"}
    ]

    total_reward = 0

    for action in actions:
        step = requests.post(f"{API_BASE_URL}/step", json=action).json()
        total_reward += step.get("reward", 0)

    return {"total_reward": total_reward}

if __name__ == "__main__":
    print(run())
