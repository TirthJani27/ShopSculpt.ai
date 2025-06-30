from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("dummy_user.json", "r") as f:
    users = json.load(f)

with open("dummy_product.json", "r") as f:
    products = json.load(f)

def get_user_by_email(email):
    for user in users:
        if user["email"] == email:
            return user
    return None

def get_recommendations(user, products, top_n=4):
    recommendations = []
    for product in products:
        score = 0

        if any(cat in user.get("interestCategory", []) for cat in product.get("categories", [])):
            score += 3

        price_rating = product.get("priceRating", 3)
        if user.get("priceRange") == "Budget_Friendly" and price_rating <= 3:
            score += 2
        elif user.get("priceRange") == "Mid_Range" and price_rating == 3:
            score += 2
        elif user.get("priceRange") == "Premium" and price_rating >= 4:
            score += 2

        if "Budget Shopper" in user.get("persona", []) and price_rating <= 3:
            score += 1

        if score > 0:
            recommendations.append({
                "product_id": product.get("product_id"),
                "name": product.get("name"),
                "score": score,
                "image": product.get("imagesUrl", [""])[0]
            })

    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations[:top_n]

@app.get("/recommend")
def recommend(email: str = Query(...)):
    user = get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    recommended = get_recommendations(user, products)
    return {
        "user": user["email"],
        "recommendations": recommended
    }
