import os
import requests

API_BASE_URL = os.getenv("API_BASE_URL", "https://api.openai.com/v1")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4.1-mini")
HF_TOKEN = os.getenv("HF_TOKEN")


def run():
    if not HF_TOKEN:
        raise ValueError("HF_TOKEN is required")

    base_url = os.getenv(
        "ENV_BASE_URL",
        "https://mishthimahajan-dataops-agent.hf.space"
    )

    reset_resp = requests.post(
        f"{base_url}/reset",
        json={"task": "easy"},
        timeout=30
    )
    reset_resp.raise_for_status()

    actions = [
        {"type": "clean_missing"},
        {"type": "convert_age"},
        {"type": "compute_avg_salary"}
    ]

    total_reward = 0.0

    for action in actions:
        step_resp = requests.post(
            f"{base_url}/step",
            json=action,
            timeout=30
        )
        step_resp.raise_for_status()
        step_data = step_resp.json()
        total_reward += float(step_data.get("reward", 0.0))

    return {
        "api_base_url": API_BASE_URL,
        "model_name": MODEL_NAME,
        "total_reward": total_reward
    }


if __name__ == "__main__":
    print(run())
