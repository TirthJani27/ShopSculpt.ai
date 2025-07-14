from fastapi import FastAPI
from pydantic import BaseModel,EmailStr
from typing import List
from recommender import recommend_products
from db import product_collection,db
from bson import ObjectId  
from fastapi.middleware.cors import CORSMiddleware
from behavior.vectorizer import get_behavior_recommendations 
from behavior.log_activity import router as log_activity_router
from fastapi import HTTPException, status


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    email: EmailStr
    interestCategory: List[str]
    persona: List[str]
    top_n: int = 6

def convert_objectid_to_str(doc):
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc

@app.post("/recommend")
async def recommend(user: User):
    existing_user = await db["users"].find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found. Please sign up or log in.")
    
    products_cursor = product_collection.find({})

    products = []
    async for p in products_cursor:
        products.append(p)

    recommended_products = recommend_products(user, products, top_n=user.top_n)

    cleaned_products = [clean_mongo_document(p) for p in recommended_products]

    return {"recommendations": cleaned_products}

class BehaviorInput(BaseModel):
    user_id: str
    top_n: int = 6

@app.post("/recommend-behavior")
async def behavior_recommend(user: BehaviorInput):
    result = await get_behavior_recommendations(user.user_id, top_n=user.top_n)
    return result

app.include_router(log_activity_router)