from fastapi import APIRouter
from pydantic import BaseModel
from bson import ObjectId
from db import db

router = APIRouter()

class LogInput(BaseModel):
    user_id: str
    term: str

@router.post("/log-search")
async def log_search(data: LogInput):
    await db["users"].update_one(
        {"_id": ObjectId(data.user_id)},
        {"$push": {"searchHistory": data.term}},
        upsert=True
    )
    return {"status": "search logged"}

@router.post("/log-cart")
async def log_cart(data: LogInput):
    await db["users"].update_one(
        {"_id": ObjectId(data.user_id)},
        {"$push": {"favorites": {"name": data.term}}},
        upsert=True
    )
    return {"status": "cart item logged"}

@router.post("/log-purchase")
async def log_purchase(data: LogInput):
    await db["users"].update_one(
        {"_id": ObjectId(data.user_id)},
        {"$push": {"transactionHistory": {"productName": data.term}}},
        upsert=True
    )
    return {"status": "purchase logged"}
