"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Star, Heart, ShoppingCart, Check } from "lucide-react"
import "swiper/css";
import "swiper/css/navigation";

const products = [
     {
      id: 1,
      title: "Apple iPhone 16 Pro",
      price: 1099.0,
      originalPrice: 1199.0,
      rating: 4.5,
      reviews: 1234,
      image: "https://i5.walmartimages.com/seo/Restored-Apple-iPhone-15-Pro-Max-1TB-Natural-Titanium-Factory-Unlocked-Refurbished_14e7fa9d-b973-4829-80ec-03d1633d647e.fe90c31e06d554eb0c949ebb82959669.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      badge: "Rollback",
    },
    {
      id: 2,
      title: 'Samsung 65" 4K TV',
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.3,
      reviews: 856,
      image: "https://i5.walmartimages.com/seo/Samsung-DU8000-UN50DU8000F-50-Smart-LED-LCD-TV-4K-UHDTV-High-Dynamic-Range-HDR-Black_0933d768-b787-47c1-b32a-c89c80d63706.0eb9c5775c5a392890755950b189c0ad.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      badge: "Save $200",
    },
    {
      id: 3,
      title: "Asus Rog Strix 16",
      price: 1449.99,
      originalPrice: 1699.99,
      rating: 4.7,
      reviews: 2341,
      image: "https://i5.walmartimages.com/seo/ASUS-ROG-Strix-G16-2025-16-Gaming-Laptop-Ryzen-9-TBD-16GB-RTX-50XX-1TB-SSD-G614FM-WS94_8e85f0bb-5fbb-4e70-b78e-01f354eeba1e.6d9b91d23872d2f6c32690b15cff41b6.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      badge: "30% off",
    },
    {
      id: 4,
      title: "Yonex Astrox Attack 9",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviews: 1876,
      image: "https://i5.walmartimages.com/seo/Yonex-Badminton-Racquet-Astrox-Attack-9-Black-G4-4U_2ca3a073-c9bb-47d8-b678-189e0fd37770.8387a06cbc11cd78573d4eb2140a1693.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      badge: "Best Seller",
    },
    {
      id: 5,
      title: "Utility Workout Bench",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 967,
      image: "https://i5.walmartimages.com/seo/K-Kingkang-Adjustable-Weight-Bench-Utility-Workout-Bench-for-Home-Gym-Foldable-Incline-Decline-Benches-for-Full-Body-Workout-660LB_afc37fe6-f8b4-4749-a808-e61192a5144f.b54e2ed438c2de356cb6648fbe2dac61.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      badge: "Save $100",
    },
    {
      id: 6,
      title: "Drawer Storage Cabinet",
      price: 59.99,
      originalPrice: 65.99,
      rating: 4.9,
      reviews: 3421,
      image: "https://i5.walmartimages.com/seo/Yangming-8-Drawer-Fabric-Dresser-for-Bedroom-Chest-of-Drawer-Organizer-Storage-Cabinet-for-Closet-Entryway-Black_ca8794cd-12dc-4765-b7b7-a57c6130ffef.c0d46ed4f057239ee585f791dbaa6d96.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      badge: "In Stock",
    },
  ];

export default function RecommendedProduct() {
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
          <SwiperSlide key={product.id}>
            <div className="border rounded-lg p-4 shadow-sm bg-white">
              <div
                className={`inline-block px-2 py-1 text-xs text-white rounded-md mb-2 ${product.badgeColor}`}
              >
                {product.badge}
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
              <div className="text-yellow-500 text-sm mb-1">
                {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)}{" "}
                <span className="text-gray-500 ml-1">({product.reviews})</span>
              </div>
              <div className="text-lg font-bold">
                ${product.price.toFixed(2)}
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              <button
                className={`mt-3 w-full px-4 py-2 rounded text-white font-semibold ${
                  product.inCart ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {product.inCart ? "✔ In Cart" : " Add to cart"}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
