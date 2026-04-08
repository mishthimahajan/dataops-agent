from pydantic import BaseModel
from typing import List, Dict, Any

class Observation(BaseModel):
    dataset: List[Dict[str, Any]]
    goal: str