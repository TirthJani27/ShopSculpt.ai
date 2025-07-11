from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from recommender import recommend_products
from db import product_collection
from bson import ObjectId  
app = FastAPI()

from bson import ObjectId

def clean_mongo_document(doc):
    if isinstance(doc, list):
        return [clean_mongo_document(item) for item in doc]
    elif isinstance(doc, dict):
        new_doc = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                new_doc[key] = str(value)
            else:
                new_doc[key] = clean_mongo_document(value)
        return new_doc
    else:
        return doc


class User(BaseModel):
    name: str
    interestCategory: List[str]
    persona: List[str]
    top_n: int = 6

def convert_objectid_to_str(doc):
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc

@app.post("/recommend")
async def recommend(user: User):
    products_cursor = product_collection.find({})

    products = []
    async for p in products_cursor:
        products.append(p)

    recommended_products = recommend_products(user, products, top_n=user.top_n)

    cleaned_products = [clean_mongo_document(p) for p in recommended_products]

    return {"recommendations": cleaned_products}

