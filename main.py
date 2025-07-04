from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from load_products import load_products
from recommender import recommend_products

app = FastAPI()

PRODUCTS = load_products("products_sample.json")

class User(BaseModel):
    name: str
    interestCategory: List[str]
    persona: str

@app.post("/recommend")
def recommend(user: User):
    result = recommend_products(user, PRODUCTS)
    return {"recommendations": result}
