"use client";
import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Heart, Trash2, Star } from "lucide-react";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);

  const pid = item._id || item.id;

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1 || newQty > 5) return;
    setQuantity(newQty);
    await onUpdateQuantity(pid, newQty);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(pid);
    setIsRemoving(false);
  };

  // Calculate original price if only discount is provided
  const originalPrice = item.originalPrice
    ? item.originalPrice
    : item.discount
    ? Math.round(item.price / (1 - item.discount / 100))
    : item.price;

  const discountPercent = Math.round(
    ((originalPrice - item.price) / originalPrice) * 100
  );

  return (
    <div
      className={`bg-white rounded-lg border p-4 md:p-6 transition-opacity duration-300 ${
        isRemoving ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.images?.[0] || "/placeholder.svg"}
            alt={item.name}
            className="w-full md:w-32 h-32 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-3">
          {/* Name & Link */}
          <div>
            <Link
              href={`/product/${pid}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
            >
              {item.name}
            </Link>
            {item.variant && (
              <p className="text-sm text-gray-600">{item.variant}</p>
            )}
            {item.seller && (
              <p className="text-sm text-gray-600">
                Seller: <span className="font-medium">{item.seller}</span>
              </p>
            )}
          </div>

          {/* Rating */}
          {typeof item.averageRating === "number" && (
            <div className="flex items-center space-x-1 text-sm text-yellow-600">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>{item.averageRating.toFixed(1)} / 5</span>
            </div>
          )}

          {/* Price & Discount */}
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-gray-900">
              ₹{item.price.toLocaleString()}
            </span>

            {originalPrice > item.price && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  {discountPercent}% off
                </span>
              </>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center space-x-4 text-sm">
            {item.deliveryDate && (
              <span className="text-gray-600">
                Delivery by {item.deliveryDate}
              </span>
            )}

            {/* Free delivery tag */}
            {item.price >= 500 && (
              <span className="text-green-700 font-semibold">
                Free Delivery
              </span>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-3">
              {/* Quantity Controls */}
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isRemoving}
                  className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 5 || isRemoving}
                  className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Max Qty Warning */}
              {quantity >= 5 && (
                <span className="text-sm text-red-500 font-medium">
                  Max limit reached
                </span>
              )}

              {/* Remove Item */}
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 font-medium text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isRemoving ? "REMOVING..." : "REMOVE"}</span>
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              disabled={isRemoving}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
