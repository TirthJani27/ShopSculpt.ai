/**
 * Profile Overview Component
 * Dashboard showing user stats, recent orders, and quick actions
 * Responsive card layout
 */
"use client"
import Link from "next/link"
import { Package, ShoppingCart, Heart, TrendingUp, Calendar, DollarSign } from "lucide-react"

export default function ProfileOverview({ user }) {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      label: "Total Orders",
      value: user.totalOrders,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Spent",
      value: `$${user.totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Wishlist Items",
      value: "12",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Cart Items",
      value: "3",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 149.99,
      items: 1,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 89.99,
      items: 3,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50"
      case "Shipped":
        return "text-blue-600 bg-blue-50"
      case "Processing":
        return "text-yellow-600 bg-yellow-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}!</h2>
        <p className="text-blue-100">Here's what's happening with your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <Link href="/profile?tab=orders" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-lg">
                  <Package className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {order.items} items • {order.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${order.total}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/cart"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Cart</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Heart className="w-8 h-8 text-red-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Wishlist</span>
          </Link>
          <Link
            href="/profile?tab=addresses"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Calendar className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Addresses</span>
          </Link>
          <Link
            href="/profile?tab=settings"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
