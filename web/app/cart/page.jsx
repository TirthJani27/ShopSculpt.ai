/**
 * Shopping Cart Page
 * Displays cart items, quantities, pricing, and checkout options
 */
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"
import CartItem from "../../components/Cart/CartItem/CartItem"
import CartSummary from "../../components/Cart/CartSummary/CartSummary"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useCart } from "../../contexts/CartContext"

export default function CartPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login?redirect=/cart")
    }
  }, [isLoggedIn, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not logged in (will redirect)
  if (!isLoggedIn) {
    return null
  }

  // Calculate totals
  const subtotal = cartTotal
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0,
  )
  const platformFee = 9
  const securedPackagingFee = 19
  const total = subtotal + platformFee + securedPackagingFee

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="md:hidden">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Cart ({cartCount} items)</h1>
          </div>
        </div>

        {/* Cart Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-lg border p-4 md:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">From Saved Addresses</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Enter Delivery Pincode</button>
              </div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
            ))}

            {/* Continue Shopping */}
            <div className="bg-white rounded-lg border p-4 md:p-6">
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary - Right Column */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              discount={totalDiscount}
              platformFee={platformFee}
              securedPackagingFee={securedPackagingFee}
              total={total}
              itemCount={cartCount}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
