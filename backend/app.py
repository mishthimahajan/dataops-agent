from flask_cors import CORS
from flask import Flask, jsonify, request
from env import DataOpsEnv

app = Flask(__name__)
CORS(app)
env = DataOpsEnv()

@app.route("/reset", methods=["GET"])
def reset():
    obs = env.reset()
    return jsonify(obs.dict())

@app.route("/step", methods=["POST"])
def step():
    action = request.json
    obs, reward, done, _ = env.step(action)

    return jsonify({
        "observation": obs.dict(),
        "reward": reward,
        "done": done
    })
@app.route("/auto", methods=["GET"])
def auto():
    rewards = []
    obs = env.reset("hard")

    actions = ["clean_missing", "convert_age", "compute_avg_salary"]

    for act in actions:
        obs, reward, done, _ = env.step({"type": act})
        rewards.append(reward)

    return jsonify({
        "dataset": obs.dataset,
        "rewards": rewards
    })
@app.route("/nlp", methods=["POST"])
def nlp():
    query = request.json["query"].lower()

    actions = []

    keywords = {
        "clean": "clean_missing",
        "fix": "clean_missing",
        "convert": "convert_age",
        "age": "convert_age",
        "average": "compute_avg_salary",
        "mean": "compute_avg_salary"
    }

    for word, action in keywords.items():
        if word in query and action not in actions:
            actions.append(action)

    return jsonify({"actions": actions})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)