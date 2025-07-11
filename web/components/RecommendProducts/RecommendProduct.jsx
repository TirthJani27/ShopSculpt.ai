"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RecommendedProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product/recommended");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-10 py-8 ml-14 mr-14">
      <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        loop
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="border rounded-lg p-4 shadow-sm bg-white">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
              <div className="text-yellow-500 text-sm mb-1">
                {"★".repeat(Math.floor(product.reviews?.[0]?.rating || 4))}
                {"☆".repeat(5 - Math.floor(product.reviews?.[0]?.rating || 4))}
                <span className="text-gray-500 ml-1">
                  ({product.reviews?.length || 0})
                </span>
              </div>
              <div className="text-lg font-bold">
                ₹{product.price.toFixed(2)}
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{(product.price / (1 - product.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              <button className="mt-3 w-full px-4 py-2 rounded text-white font-semibold bg-blue-600">
                Add to cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
