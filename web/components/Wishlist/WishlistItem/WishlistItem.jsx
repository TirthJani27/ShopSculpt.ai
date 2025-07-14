/**
 * Wishlist Item Component
 * Individual wishlist item with remove and add to cart functionality
 * Responsive card design with cart integration
 */
"use client"
import { useState } from "react"
import Link from "next/link"
import { Star, X, ShoppingCart, Check } from "lucide-react"
import { useCart } from "../../../contexts/CartContext"

export default function WishlistItem({ item, onRemove }) {
  const { addToCart, isInCart } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const inCartAlready = isInCart(item.id)

  const handleRemove = async () => {
    setIsRemoving(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    onRemove(item.id)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    addToCart(item)
    setIsAddingToCart(false)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div
      className={`bg-white rounded-lg border hover:shadow-lg transition-all group ${isRemoving ? "opacity-50" : ""}`}
    >
      {/* Remove Button */}
      <div className="relative">
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-100 disabled:opacity-50"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Product Image */}
        <Link href={`/product/${item.id}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title || item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link href={`/product/${item.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {item.title || item.name}
          </h3>
        </Link>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex items-center">{renderStars(item.rating)}</div>
            <span className="text-xs text-gray-600">({item.reviews || item.reviewCount || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">${(item.price || 0).toFixed(2)}</span>
          {item.originalPrice && item.originalPrice > item.price && (
            <>
              <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
              </span>
            </>
          )}
        </div>

        {/* Added Date */}
        <p className="text-xs text-gray-500">Added {new Date(item.addedAt).toLocaleDateString()}</p>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isRemoving}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              inCartAlready ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
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
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}