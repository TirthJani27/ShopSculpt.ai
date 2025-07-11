import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise Exception("Please define the MONGODB_URI environment variable in .env")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)

db = client["test"]

product_collection = db["products"]
