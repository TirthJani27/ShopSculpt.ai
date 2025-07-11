"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import CategorySection from "../../CategorySection/CategorySection";

export default function ProductGrid() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [groceryProducts, setGroceryProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // Fetch recommended products
        const recRes = await fetch("/api/product/recommended");
        const recommended = await recRes.json();

        // Fetch grocery category
        const groceryRes = await fetch("/api/product/category/Grocery");
        const grocery = await groceryRes.json();

        // Fetch electronics category
        const electronicsRes = await fetch("/api/product/category/Electronic");
        const electronics = await electronicsRes.json();

        const transform = (products) =>
          products.map((p) => {
            const originalPrice = p.discount
              ? p.price / (1 - p.discount / 100)
              : p.price;

            return {
              id: p._id,
              title: p.name,
              price: p.price,
              originalPrice: originalPrice,
              rating: p.reviews?.[0]?.rating || 4.5,
              reviews: p.reviews?.length || 0,
              image: p.images?.[0],
              badge:
                p.discount >= 30
                  ? "Hot Deal"
                  : p.discount > 0
                  ? `Save ${p.discount}%`
                  : "New",
            };
          });

        setRecommendedProducts(transform(recommended));
        setGroceryProducts(transform(grocery));
        setElectronicsProducts(transform(electronics));
      } catch (err) {
        console.error("Failed to load products from DB:", err);
      }
    };

    fetchAllProducts();
  }, []);

  const categories = [
    {
      title: "Skechers up to 30% off",
      subtitle: "Shop athletic shoes",
      products: recommendedProducts.slice(0, 4),
      bgColor: "bg-blue-50",
    },
    {
      title: "Home essentials",
      subtitle: "Upgrade your space",
      products: groceryProducts.slice(0, 4),
      bgColor: "bg-gray-50",
    },
    {
      title: "Electronics deals",
      subtitle: "Tech for less",
      products: electronicsProducts.slice(0, 4),
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <CategorySection key={index} category={category} />
      ))}

      {/* Additional Product Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">More Great Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendedProducts.map((product, index) => (
            <ProductCard
              key={`more-${index}`}
              product={{ ...product, id: `more-${index}` }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
