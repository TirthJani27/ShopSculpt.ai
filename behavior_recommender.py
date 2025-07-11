import json
from collections import defaultdict

# Define weights for each type of user action
ACTION_WEIGHTS = {
    "search": 1,
    "view": 2,
    "cart": 3,
    "purchase": 5
}

def load_products(path="products.ts"):
    with open(path, "r") as f:
        return json.load(f)

def load_user_logs(path="user_behavior.json"):
    with open(path, "r") as f:
        return json.load(f)

def build_user_product_scores(user_logs):
    user_scores = defaultdict(lambda: defaultdict(int))
    for entry in user_logs:
        user = entry["user_id"]
        product_name = entry.get("product_name")
        action = entry["action"]
        if product_name and action in ACTION_WEIGHTS:
            user_scores[user][product_name] += ACTION_WEIGHTS[action]
    return user_scores

def get_all_products_by_behavior(user_id):
    product_data = load_products()
    user_logs = load_user_logs()
    scores = build_user_product_scores(user_logs)

    user_scores = scores.get(user_id, {})

    def product_score(product):
        return user_scores.get(product["Name"], 0)

    ranked_products = sorted(product_data, key=product_score, reverse=True)
    return ranked_products

