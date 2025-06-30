/**
 * Profile Wishlist Component
 * Displays user's wishlist items in the profile page
 * Shows empty state if no items in wishlist
 */
"use client"
import Link from "next/link"
import { Heart, ShoppingCart, Eye, X, ShoppingBag } from "lucide-react"
import { useWishlist } from "../../../contexts/WishlistContext"
import { useCart } from "../../../contexts/CartContext"
import EmptyState from "../EmptyState/EmptyState"

export default function ProfileWishlist() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (item) => {
    addToCart(item)
  }

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love by clicking the heart icon. We'll keep them safe here for you."
          actionText="Start Shopping"
          actionLink="/"
          actionIcon={ShoppingBag}
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist ({wishlistCount} items)</h2>
        <Link href="/wishlist" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.slice(0, 6).map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 group relative">
            <button
              onClick={() => handleRemoveFromWishlist(item.id)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <Link href={`/product/${item.id}`}>
              <div className="aspect-square overflow-hidden rounded-lg mb-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            <div className="space-y-2">
              <Link href={`/product/${item.id}`}>
                <h4 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                  {item.title || item.name}
                </h4>
              </Link>

              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">₹{(item.price || 0).toLocaleString()}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <Link
                  href={`/product/${item.id}`}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {wishlistItems.length > 6 && (
        <div className="text-center mt-6 pt-6 border-t">
          <p className="text-gray-600 mb-4">+{wishlistItems.length - 6} more items in your wishlist</p>
          <Link href="/wishlist" className="text-blue-600 hover:text-blue-700 font-medium">
            View All Wishlist Items →
          </Link>
        </div>
      )}
    </div>
  )
}
