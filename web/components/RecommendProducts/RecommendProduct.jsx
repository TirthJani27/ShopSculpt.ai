"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";

export default function RecommendedProduct() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { isLoggedIn } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product/recommended");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlistClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      showToastMessage("Please sign in to add items to wishlist");
      return;
    }

    const result = isInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product);

    showToastMessage(result.message);
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      showToastMessage("Please sign in to add items to cart");
      return;
    }

    setIsAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = addToCart(product);
    showToastMessage(result.message);
    setIsAddingToCart(false);
  };

  return (
    <div className="mt-12 mb-12 mx-4 sm:mx-6 lg:mx-24">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Recommended Products
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length > 0 ? (
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            breakpoints={{
              480: { slidesPerView: 1.3 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {products.map((product) => {
              const inWishlist = isInWishlist(product._id);
              const inCartAlready = isInCart(product._id);

              return (
                <SwiperSlide key={product._id}>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer group relative">
                    <Link href={`/product/${product._id}`}>
                      <div className="relative mb-3 w-full h-40 sm:h-44 md:h-48 flex items-center justify-center overflow-hidden bg-white rounded">
                        <img
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    <button
                      onClick={(e) => handleWishlistClick(e, product)}
                      className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${
                        inWishlist
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          inWishlist ? "fill-current" : ""
                        }`}
                      />
                    </button>

                    <Link href={`/product/${product._id}`}>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                          {product.name}
                        </h3>

                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.averageRating || 4)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600">
                            ({product.reviews?.length || 0})
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.price.toFixed(2)}
                          </span>
                          {product.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹
                              {(
                                product.price /
                                (1 - product.discount / 100)
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={isAddingToCart}
                      className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors mt-3 flex items-center justify-center space-x-1 ${
                        inCartAlready
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : inCartAlready ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>In Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button className="swiper-prev absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 lg:-left-6 bg-white border rounded-full p-2 shadow z-10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="swiper-next absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 lg:-right-6 bg-white border rounded-full p-2 shadow z-10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

