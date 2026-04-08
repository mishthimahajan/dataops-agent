def run_agent(env):
    obs = env.reset("hard")

    actions = [
        {"type": "clean_missing"},
        {"type": "convert_age"},
        {"type": "compute_avg_salary"}
    ]

    total_reward = 0

    for act in actions:
        obs, reward, done, _ = env.step(act)
        total_reward += reward
        if done:
            break

    return total_reward