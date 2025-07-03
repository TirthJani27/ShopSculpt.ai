def generate_recommendations(user, products, top_n=4):
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
