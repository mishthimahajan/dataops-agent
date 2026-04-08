tasks = {
    "easy": {
        "goal": "Clean missing values",
        "steps": ["clean_missing"]
    },
    "medium": {
        "goal": "Clean + convert types",
        "steps": ["clean_missing", "convert_age"]
    },
    "hard": {
        "goal": "Full pipeline + compute avg salary",
        "steps": ["clean_missing", "convert_age", "compute_avg_salary"]
    }
}