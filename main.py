from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from recommender import generate_recommendations

app = FastAPI()

# CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recommend")
async def recommend(request: Request):
    data = await request.json()
    user = data["user"]
    products = data["products"]

    recommendations = generate_recommendations(user, products)
    return {"recommendations": recommendations[:4]}
