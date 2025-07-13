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
async def fetch_user_behavior(user_id: str):
    user = await db["users"].find_one({"_id": ObjectId(user_id)})

    if not user:
        raise ValueError("User not found")

    search_terms = user.get("searchHistory", [])
    favorites = [p.get("name", "") for p in user.get("favorites", [])]
    purchases = [t.get("productName", "") for t in user.get("transactionHistory", [])]

    return {
        "searches": search_terms,
        "cart": favorites,
        "purchase": purchases
    }

# 2. Action weights
ACTION_WEIGHTS = {
    "searches": 1,
    "cart": 3,
    "purchase": 4
}

# 3. Convert logs to weighted text
def create_weighted_user_text(user_logs):
    all_terms = []
    for action, terms in user_logs.items():
        weight = ACTION_WEIGHTS.get(action, 1)
        for term in terms:
            all_terms.extend([term] * weight)
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
