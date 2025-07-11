import json

def load_products(filepath="products.ts"):
    with open(filepath, "r", encoding="utf-8") as f:
        raw = json.load(f)

    persona_map = {
        "fashion": ["trendsetter", "youthful"],
        "beauty": ["glamorous", "eco-friendly"],
        "electronic": ["techie", "minimalist"],
        "grocery": ["eco-friendly", "family"],
        "gym related": ["fitness-enthusiast"],
        "furniture": ["home-lover", "luxury"]
    }

    for idx, product in enumerate(raw):
        product["id"] = f"p{101 + idx}" 
        product["name"] = product.pop("Name", "")
        product["category"] = product.pop("Category", "").lower()
        product["personaTags"] = persona_map.get(product["category"], ["general"])

    print("First 5 product IDs:", [p["id"] for p in raw[:5]])

    return raw
