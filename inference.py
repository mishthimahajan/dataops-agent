import requests
import os

API_BASE_URL = os.getenv("API_BASE_URL", "https://mishthimahajan-dataops-agent.hf.space")

def run():
    # Step 1: Reset environment
    res = requests.post(f"{API_BASE_URL}/reset", json={"task": "easy"})
    data = res.json()

    # Step 2: Perform actions
    actions = [
        {"type": "clean_missing"},
        {"type": "convert_age"},
        {"type": "compute_avg_salary"}
    ]

    total_reward = 0

    for action in actions:
        step = requests.post(f"{API_BASE_URL}/step", json=action).json()
        total_reward += step.get("reward", 0)

    return {
        "total_reward": total_reward
    }


if __name__ == "__main__":
    result = run()
    print(result)
