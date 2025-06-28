import json
from collections import defaultdict


with open("dummy_user.json", "r") as f:
    users = json.load(f)

with open("dummy_product.json", "r") as f:
    products = json.load(f)

product_map = {prod["product_id"]: prod for prod in products}

category_index = defaultdict(list)
name_index = defaultdict(list)

for prod in products:
    for cat in prod["categories"]:
        category_index[cat.lower()].append(prod["product_id"])
    name_index[prod["name"].lower()] = prod["product_id"]


def recommend_for_user(user):
    scores = defaultdict(int)
    email = user["email"]

    for search in user.get("searchHistory", []):
        keyword = search["keyword"].lower()
        for pid, prod in product_map.items():
            if keyword in prod["name"].lower():
                scores[pid] += 3
            if any(keyword in cat.lower() for cat in prod["categories"]):
                scores[pid] += 2

    for cart_item in user.get("cart", []):
        pid = cart_item["productId"]
        scores[pid] += 4
        for cat in product_map[pid]["categories"]:
            for related_pid in category_index[cat.lower()]:
                if related_pid != pid:
                    scores[related_pid] += 2

    for pid in user.get("transactionHistory", []):
        scores[pid] += 5
        for cat in product_map[pid]["categories"]:
            for related_pid in category_index[cat.lower()]:
                if related_pid != pid:
                    scores[related_pid] += 2

    for interest in user.get("interestCategory", []):
        for related_pid in category_index[interest.lower()]:
            scores[related_pid] += 1

    sorted_recommendations = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top = sorted_recommendations[:5]

    print(f"\n🎯 Recommendations for {email}")
    for pid, score in top:
        print(f"  🔹 {product_map[pid]['name']} (Score: {score})")

for user in users:
    recommend_for_user(user)
