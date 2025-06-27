/**
 * Enhanced Product Card Component
 * Includes wishlist and cart functionality with authentication check
 * Shows toast notifications for user feedback
 */
"use client"
import { useState } from "react"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Check } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useWishlist } from "../../contexts/WishlistContext"
import { useCart } from "../../contexts/CartContext"

export default function ProductCard({ product }) {
  const { isLoggedIn } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart, isInCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { title, price, originalPrice, rating, reviews, image, badge } = product
  const inWishlist = isInWishlist(product.id)
  const inCartAlready = isInCart(product.id)

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      showToastMessage("Please sign in to add items to wishlist")
      return
    }

    if (inWishlist) {
      const result = removeFromWishlist(product.id)
      showToastMessage(result.message)
    } else {
      const result = addToWishlist(product)
      showToastMessage(result.message)
    }
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      showToastMessage("Please sign in to add items to cart")
      return
    }

    setIsAddingToCart(true)

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = addToCart(product)
    showToastMessage(result.message)

    setIsAddingToCart(false)
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative">
        {/* Badge */}
        {badge && (
          <div className="mb-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{badge}</span>
          </div>
        )}

        {/* Product Image */}
        <Link href={`/product/${product.id}`}>
          <div className="relative mb-3">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Wishlist Button */}
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

        {/* Product Info */}
        <Link href={`/product/${product.id}`}>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">{title}</h3>

            {/* Rating */}
            {rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({reviews})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
              {originalPrice && <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors mt-3 flex items-center justify-center space-x-1 ${
            inCartAlready ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
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

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </>
  )
}
