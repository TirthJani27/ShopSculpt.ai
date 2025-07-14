"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useCart } from "../../contexts/CartContext";

function useTruncateIfOverflow(text, maxLength = 40) {
  const [displayText, setDisplayText] = useState(text);
  const spanRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = spanRef.current;
      if (!el) return;
      if (el.scrollWidth > el.clientWidth) {
        setDisplayText(text.slice(0, maxLength).trim() + "…");
      } else {
        setDisplayText(text);
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (spanRef.current) observer.observe(spanRef.current);
    window.addEventListener("load", checkOverflow);
    checkOverflow();

    return () => {
      observer.disconnect();
      window.removeEventListener("load", checkOverflow);
    };
  }, [text, maxLength]);

  return { displayText, spanRef };
}

export default function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { title, price, originalPrice, image, badge } = product;
  const inWishlist = isInWishlist(product.id);
  const inCartAlready = isInCart(product.id);
  const { displayText, spanRef } = useTruncateIfOverflow(title, 45);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      triggerToast("Please sign in to add items to wishlist");
      return;
    }

    const result = inWishlist
      ? await removeFromWishlist(product.id)
      : await addToWishlist(product);
    triggerToast(result.message);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      triggerToast("Please sign in to add items to cart");
      return;
    }

    if (inCartAlready) {
      triggerToast("Item already in cart");
      return;
    }

    setIsAddingToCart(true);
    const result = await addToCart(product);
    triggerToast(result.message);
    setIsAddingToCart(false);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative">
        {badge && (
          <div className="mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {badge}
            </span>
          </div>
        )}

        <Link href={`/product/${product.id}`}>
          <div className="relative mb-3 w-full h-40 overflow-hidden bg-white rounded flex items-center justify-center">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        <Link href={`/product/${product.id}`}>
          <div className="space-y-2">
            <h3
              ref={spanRef}
              className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate"
            >
              {displayText}
            </h3>

            {
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-600">
                  ({product.totalReviews})
                </span>
              </div>
            }

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ₹{price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || inCartAlready}
          className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors mt-3 flex items-center justify-center space-x-1 ${
            inCartAlready
              ? "bg-green-600 hover:bg-green-700 text-white"
              :"bg-blue-600 hover:bg-blue-700 text-white"
          } disabled: disabled:cursor-not-allowed`}
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

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </>
  );
}
