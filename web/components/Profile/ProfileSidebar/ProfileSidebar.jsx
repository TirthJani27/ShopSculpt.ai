/**
 * Profile Sidebar Component
 * Navigation sidebar for user profile sections
 * Responsive design with mobile-friendly tabs
 */
"use client"
import { User, Package, Settings, Heart, MapPin, CreditCard, LogOut } from "lucide-react"

export default function ProfileSidebar({ user, activeTab, setActiveTab }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
  ]

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* User Info */}
      <div className="text-center mb-6 pb-6 border-b">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-semibold text-gray-900">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500 mt-1">Member since {user.memberSince}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-6 border-t">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
