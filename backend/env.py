from tasks import tasks
import copy
from models import Observation

class DataOpsEnv:
    def __init__(self):
        self.initial_data = [
            {"name": "Alice", "age": "25", "salary": "50000"},
            {"name": None, "age": "30", "salary": None},
            {"name": "Bob", "age": "twenty", "salary": "60000"}
        ]
        self.reset()

    def reset(self, task="easy"):
        self.task = task
        self.data = copy.deepcopy(self.initial_data)
        self.goal = tasks[task]["goal"]
        return Observation(dataset=self.data, goal=self.goal)

    def step(self, action):
        reward = 0
        done = False

        if action["type"] == "clean_missing":
            for row in self.data:
                for k, v in row.items():
                    if v is None:
                        row[k] = "0"
            reward += 0.2

        elif action["type"] == "convert_age":
            for row in self.data:
                try:
                    row["age"] = int(row["age"])
                    reward += 0.2
                except:
                    row["age"] = 0

        elif action["type"] == "compute_avg_salary":
            total, count = 0, 0
            for row in self.data:
                try:
                    total += int(row["salary"])
                    count += 1
                except:
                    pass
            self.result = total / count if count else 0
            reward += 0.5
            done = True

        return Observation(dataset=self.data, goal=self.goal), reward, done, {}

    def state(self):
        return self.data