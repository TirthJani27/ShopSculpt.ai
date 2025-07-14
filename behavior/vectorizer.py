import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv
from bson import ObjectId  

# MongoDB setup
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGODB_URI)
db = client["test"]
product_collection = db["products"]

# 1. Fetch user logs from MongoDB
async def fetch_user_behavior(user_id):
    try:
        user = await db["users"].find_one({"_id": ObjectId(user_id)})
    except Exception as e:
        raise ValueError(f"Invalid ObjectId: {e}")

    if not user:
        raise ValueError("User not found in DB")

    return {
        "search": user.get("searchHistory", []),
        "favorites": user.get("favorites", []),
        "purchased": user.get("transactionHistory", [])
    }

# 2. Action weights
ACTION_WEIGHTS = {
    "search": 1,
    "favorites": 2,
    "purchased": 3
}

# 3. Convert logs to weighted text
def create_weighted_user_text(user_logs):
    def safe_extract(item, key):
        if isinstance(item, str):
            return item
        elif isinstance(item, dict):
            return item.get(key, "")
        return str(item)

    search_terms = [safe_extract(item, "query") for item in user_logs.get("search", [])]
    favorite_terms = [safe_extract(item, "product_name") for item in user_logs.get("favorites", [])]
    purchase_terms = [safe_extract(item, "product_name") for item in user_logs.get("purchased", [])]

    all_terms = (
        search_terms * ACTION_WEIGHTS["search"] +
        favorite_terms * ACTION_WEIGHTS["favorites"] +
        purchase_terms * ACTION_WEIGHTS["purchased"]
    )

    all_terms = [term for term in all_terms if isinstance(term, str) and term.strip()]
    return " ".join(all_terms)

# 4. Fetch all products
async def fetch_products():
    cursor = product_collection.find({}, {"_id": 0})
    return await cursor.to_list(length=None)

# 5. Prepare product text
def prepare_text(product):
    name = product.get("name", "")
    category = product.get("category", "")
    persona = " ".join(product.get("persona", []))
    description = product.get("description", "")
    return f"{name} {category} {persona} {description}"

# 6. TF-IDF Vectorization
def vectorize(user_text, product_texts):
    all_texts = product_texts + [user_text]
    vectorizer = TfidfVectorizer(stop_words="english")
    vectors = vectorizer.fit_transform(all_texts)
    return vectors[:-1], vectors[-1]

# 7. Get top product recommendations
def recommend_products(products, product_vectors, user_vector, top_n=5):
    scores = cosine_similarity(user_vector, product_vectors).flatten()
    top_indices = scores.argsort()[::-1][:top_n]
    return [(products[i], scores[i]) for i in top_indices]

# 8. Main behavior-based recommendation logic
async def get_behavior_recommendations(user_id: str, top_n: int = 5):
    user_logs = await fetch_user_behavior(user_id)
    user_text = create_weighted_user_text(user_logs)
    products = await fetch_products()
    product_texts = [prepare_text(p) for p in products]

    product_vectors, user_vector = vectorize(user_text, product_texts)
    top_recs = recommend_products(products, product_vectors, user_vector, top_n)

    return {
        "recommended": [
            {
                "name": p["name"],
                "category": p["category"],
                "description": p["description"],
                "persona": p.get("persona", []),
                "price": p["price"],
                "image": p["images"][0],
                "score": round(score, 4)
            }
            for p, score in top_recs
        ]
    }
