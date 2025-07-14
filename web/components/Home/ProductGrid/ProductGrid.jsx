"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import CategorySection from "../../CategorySection/CategorySection";

export default function ProductGrid() {
  const [products, setProducts] = useState({
    recommended: [],
    grocery: [],
    electronics: [],
  });

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const transformProducts = (items) =>
      items.map((p) => {
        const originalPrice = p.discount
          ? p.price / (1 - p.discount / 100)
          : p.price;

        return {
          id: p._id,
          title: p.name,
          price: p.price,
          originalPrice,
          image: p.images?.[0],
          badge:
            p.discount >= 30
              ? "Hot Deal"
              : p.discount > 0
              ? `Save ${p.discount}%`
              : "New",
          ...p,
        };
      });

    const fetchProducts = async () => {
      try {
        const [recRes, groceryRes, electronicsRes] = await Promise.all([
          fetch("/api/product/recommended"),
          fetch("/api/product/category/Grocery"),
          fetch("/api/product/category/Electronic"),
        ]);

        const [recommended, grocery, electronics] = await Promise.all([
          recRes.json(),
          groceryRes.json(),
          electronicsRes.json(),
        ]);

        setProducts({
          recommended: transformProducts(recommended),
          grocery: transformProducts(grocery),
          electronics: transformProducts(electronics),
        });
      } catch (err) {
        console.error("Failed to fetch product data:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const { recommended, grocery, electronics } = products;

  const categories = [
    {
      title: "Must-Have Deals This Week",
      subtitle: "Editor’s picks across categories",
      products: recommended.slice(4, 8),
      bgColor: "bg-amber-50",
    },
    {
      title: "Home essentials",
      subtitle: "Upgrade your space",
      products: grocery.slice(0, 4),
      bgColor: "bg-gray-50",
    },
    {
      title: "Electronics deals",
      subtitle: "Tech for less",
      products: electronics.slice(0, 4),
      bgColor: "bg-green-50",
    },
  ];

  const SkeletonCard = () => (
    <div className="bg-gray-100 animate-pulse h-64 rounded-xl" />
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : recommended.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {!loading &&
        categories.map((category, index) => (
          <CategorySection key={index} category={category} />
        ))}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">More Great Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : recommended.slice(6, 12).map((product, index) => (
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
