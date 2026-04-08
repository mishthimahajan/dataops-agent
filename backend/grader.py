def grade(dataset, result, task):
    score = 0

    # Cleaning check
    if all(row["name"] is not None for row in dataset):
        score += 0.3

    # Type check
    if all(isinstance(row["age"], int) for row in dataset):
        score += 0.3

    # Final result
    if task == "hard" and abs(result - 55000) < 1000:
        score += 0.4

    return score