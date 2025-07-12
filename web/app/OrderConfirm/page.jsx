
"use client"
import { useEffect, useState } from "react"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder")
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder)
      setOrder(parsedOrder)

      // Save the confirmed order to localStorage under "userOrders"
      const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]")
      const newOrder = {
        ...parsedOrder,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        status: "Processing",
        total: parsedOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      }
      const updatedOrders = [newOrder, ...existingOrders]
      localStorage.setItem("userOrders", JSON.stringify(updatedOrders))
    }
  }, [])

  if (!order) return <p className="p-10 text-center">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Order Placed Successfully!</h1>
        <p className="mb-2">Delivery Address:</p>
        <div className="p-4 bg-white rounded shadow mb-6">
          <pre className="whitespace-pre-wrap text-sm">{order.address}</pre>
        </div>
        <h2 className="text-xl font-semibold mb-2">Items:</h2>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="p-3 bg-white rounded shadow">
              {item.name} × {item.quantity}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
