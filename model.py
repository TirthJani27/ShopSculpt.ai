from pydantic import BaseModel, Field
from typing import List, Optional


class ReviewModel(BaseModel):
    rating: float = Field(..., ge=0, le=5)
    description: str


class ProductModel(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    discount: Optional[float] = 0
    reviews: Optional[List[ReviewModel]] = []
    category: Optional[str] = ""
    images: List[str]
    arrival_dates: Optional[int] = 3
    persona: List[str] 
