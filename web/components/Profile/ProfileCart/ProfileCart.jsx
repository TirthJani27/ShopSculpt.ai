/**
 * Profile Cart Component
 * Displays user's cart items in the profile page
 * Shows empty state if no items in cart
 */
"use client"
import Link from "next/link"
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "../../../contexts/CartContext"
import EmptyState from "../EmptyState/EmptyState"

export default function ProfileCart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Cart</h2>
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Add some products to your cart to see them here. Start shopping and find amazing deals!"
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
        <h2 className="text-2xl font-bold text-gray-900">My Cart ({cartCount} items)</h2>
        <Link href="/cart" className="text-blue-600 hover:text-blue-700 font-medium">
          View Full Cart →
        </Link>
      </div>

      <div className="space-y-4">
        {cartItems.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />

            <div className="flex-1">
              <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
              <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {cartItems.length > 3 && (
          <div className="text-center py-4 border-t">
            <p className="text-gray-600">+{cartItems.length - 3} more items in your cart</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Total: ₹{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/cart"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium text-center"
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-center"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
