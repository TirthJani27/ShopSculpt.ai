from model import ProductModel
from typing import List

def recommend_products(user, products, top_n=6):
    recommendations = []
    user_interests = [cat.lower() for cat in user.interestCategory]
    user_personas = [p.lower() for p in user.persona]

    for product in products:
        score = 0

        if product.get("category", "").lower() in user_interests:
            score += 5
        if any(p in [tag.lower() for tag in product.get("persona", [])] for p in user_personas):
            score += 3
        reviews = product.get("reviews", [])
        if reviews:
            avg_rating = sum([r.get("rating", 0) for r in reviews]) / len(reviews)
            if avg_rating >= 4.5:
                score += 2
        if product.get("discount", 0) >= 30:
            score += 1
        if product.get("arrival_dates", 999) <= 7:
            score += 1

        if score > 0:
            recommendations.append((product, score))

    if recommendations:
        recommendations.sort(key=lambda x: x[1], reverse=True)
        return [p for p, _ in recommendations[:top_n]]

    fallback_products = sorted(
        products,
        key=lambda p: (
            -p.get("discount", 0),
            -len(p.get("reviews", [])),
            p.get("arrival_dates", 999)
        )
    )
    return fallback_products[:top_n]
