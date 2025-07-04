from typing import List

def recommend_products(user, products, top_n=6):
    recommendations = []

    for product in products:
        score = 0

        if product.get("category", "").lower() in [cat.lower() for cat in user.interestCategory]:
            score += 3

        persona_tags = [tag.lower() for tag in product.get("personaTags", [])]
        if user.persona.lower() in persona_tags:
            score += 2

        if score > 0:
            recommendations.append((product, score))

    recommendations.sort(key=lambda x: x[1], reverse=True)
    return [p for p, _ in recommendations[:top_n]]
