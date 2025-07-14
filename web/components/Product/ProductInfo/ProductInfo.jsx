"use client";
import { useState } from "react";
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWishlist } from "../../../contexts/WishlistContext";

export default function ProductInfo({ product }) {
  const { isLoggedIn } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const showToastTemporarily = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleWishlistClick = async () => {
    if (!isLoggedIn) {
      showToastTemporarily("Please sign in to manage your wishlist");
      return;
    }

    const result = inWishlist
      ? await removeFromWishlist(product.id)
      : await addToWishlist(product);
    showToastTemporarily(result.message);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6 relative">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {renderStars(product.averageRating)}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {product.averageRating}
            </span>
          </div>
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            ({product.reviews.length} reviews)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleWishlistClick}
            className={`flex items-center space-x-2 text-sm ${
              inWishlist
                ? "text-red-500 font-semibold"
                : "text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                inWishlist ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span>{inWishlist ? "Wishlisted" : "Add to Wishlist"}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 text-sm">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Price Display - Mobile */}
      <div className="lg:hidden bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
            {product.discount}% off
          </span>
        </div>
        <p className="text-green-600 text-sm font-medium">
          You save ₹{(product.originalPrice - product.price).toFixed(2)}
        </p>
      </div>

      {/* Product Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Delivery & Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Delivery & Services
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Free Delivery</p>
              <p className="text-gray-600">On orders over ₹350</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Easy Returns</p>
              <p className="text-gray-600">10-day return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Warranty</p>
              <p className="text-gray-600">1-year manufacturer warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded shadow-md">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
