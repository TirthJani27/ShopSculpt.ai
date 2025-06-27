/**
 * Order History Component
 * Displays user's order history with filtering and search
 * Responsive table/card layout
 */
"use client"
import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock order data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: [{ name: "Modern Platform Bed Frame", quantity: 1, price: 299.99 }],
      deliveryDate: "2024-01-18",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 149.99,
      items: [{ name: "Wireless Bluetooth Headphones", quantity: 1, price: 149.99 }],
      deliveryDate: "2024-01-16",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      status: "Processing",
      total: 89.99,
      items: [{ name: "Kitchen Utensil Set", quantity: 2, price: 44.99 }],
      deliveryDate: "2024-01-12",
      trackingNumber: null,
    },
    {
      id: "ORD-2023-045",
      date: "2023-12-28",
      status: "Cancelled",
      total: 199.99,
      items: [{ name: "Smart Watch Series 5", quantity: 1, price: 199.99 }],
      deliveryDate: null,
      trackingNumber: null,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "Processing":
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Order History</h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-lg font-bold text-gray-900">${order.total}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                  {order.trackingNumber && <span>Tracking: {order.trackingNumber}</span>}
                  {order.deliveryDate && <span className="ml-4">Expected delivery: {order.deliveryDate}</span>}
                </div>

                <div className="flex space-x-3">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  {order.status === "Delivered" && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Buy Again</button>
                  )}
                  {order.status === "Shipped" && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Track Order</button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
