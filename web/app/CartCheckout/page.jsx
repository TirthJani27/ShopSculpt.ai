

"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"
import CheckoutForm from "../../components/Cart/CartCheckout/CartCheckout"
import OrderSummary from "../../components/Cart/CartCheckout/OrderSummary"
import CartItem from "../../components/Cart/CartItem/CartItem"
import { useAuth } from "../../contexts/AuthContext"
import { useCart } from "../../contexts/CartContext"

export default function CheckoutPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [address, setAddress] = useState("")

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login?redirect=/checkout")
    }
  }, [isLoggedIn, isLoading, router])

  if (!isLoggedIn || isLoading) return null

  const handlePlaceOrder = () => {
    const order = {
      items: cartItems,
      address,
      placedAt: new Date().toISOString(),
    }
    localStorage.setItem("latestOrder", JSON.stringify(order))
    clearCart()
    router.push("/OrderConfirm")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Step 1: Shipping Address */}
        <div className="mb-8">
          <CheckoutForm address={address} setAddress={setAddress} />
        </div>

        {/* Step 2: Product List */}
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              readonly={true} 
            />
          ))}
        </div>

        {/* Step 3: Summary + Place Order */}
        <OrderSummary cart={cartItems} />

        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Confirm & Pay
        </button>
      </main>
      <Footer />
    </div>
  )
}
