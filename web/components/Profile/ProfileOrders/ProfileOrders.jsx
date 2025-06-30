/**
 * Profile Orders Component
 * Displays user's recent orders in the profile page
 * Shows empty state if no orders placed
 */
"use client"
import Link from "next/link"
import { Package, Eye, ShoppingBag } from "lucide-react"
import EmptyState from "../EmptyState/EmptyState"

export default function ProfileOrders() {
  // For new users, orders array will be empty
  // In a real app, this would come from an API or context
  const orders = []

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50"
      case "Shipped":
        return "text-blue-600 bg-blue-50"
      case "Processing":
        return "text-yellow-600 bg-yellow-50"
      case "Cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="You haven't placed any orders yet. Start shopping to see your orders here!"
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
        <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
        <Link href="/profile?tab=orders" className="text-blue-600 hover:text-blue-700 font-medium">
          View All Orders →
        </Link>
      </div>

      <div className="space-y-4">
        {orders.slice(0, 3).map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{order.id}</h4>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">₹{order.total.toLocaleString()}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{order.items} items</p>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                {order.status === "Delivered" && (
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Buy Again</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
