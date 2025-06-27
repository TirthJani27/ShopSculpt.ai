/**
 * Cart Item Component
 * Individual cart item with quantity controls, pricing, and remove functionality
 */
"use client"
import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Heart, Trash2 } from "lucide-react"

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity)
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    onRemove(item.id)
  }

  const discountAmount = ((item.originalPrice || item.price) - item.price) * quantity
  const discountPercentage = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0

  return (
    <div className={`bg-white rounded-lg border p-4 md:p-6 transition-opacity ${isRemoving ? "opacity-50" : ""}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full md:w-32 h-32 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div>
            <Link
              href={`/product/${item.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
            >
              {item.name}
            </Link>
            {item.variant && <p className="text-sm text-gray-600">{item.variant}</p>}
            <p className="text-sm text-gray-600">
              Seller: <span className="font-medium">{item.seller}</span>
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
            {item.originalPrice && item.originalPrice > item.price && (
              <>
                <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                <span className="text-sm text-green-600 font-medium">{discountPercentage}% off</span>
              </>
            )}
          </div>

          {/* Offers */}
          {item.offers && <p className="text-sm text-green-600 font-medium">{item.offers}</p>}

          {/* Delivery Info */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Delivery by {item.deliveryDate}</span>
            {item.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || isRemoving}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isRemoving}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                className="text-gray-600 hover:text-blue-600 font-medium text-sm disabled:opacity-50"
                disabled={isRemoving}
              >
                SAVE FOR LATER
              </button>

              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isRemoving ? "REMOVING..." : "REMOVE"}</span>
              </button>
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50" disabled={isRemoving}>
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
