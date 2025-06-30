/**
 * Profile Sidebar Component
 * Navigation sidebar for user profile sections
 * Responsive design with mobile-friendly tabs
 * Updated to use actual user data from auth context and improved mobile responsiveness
 */
"use client"
import { User, Package, Settings, Heart, MapPin, CreditCard, LogOut, Shield, ShoppingCart } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth()

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "cart", label: "My Cart", icon: ShoppingCart },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ]

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      logout()
      window.location.href = "/"
    }
  }

  // Format member since date
  const getMemberSince = () => {
    if (user?.registrationDate) {
      return new Date(user.registrationDate).getFullYear().toString()
    }
    return "2024"
  }

  return (
    <div className="bg-white rounded-lg border p-4 md:p-6">
      {/* User Info */}
      <div className="text-center mb-6 pb-6 border-b">
        <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-lg md:text-2xl font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 text-sm md:text-base break-words">{user?.name || "User"}</h3>
        <p className="text-xs md:text-sm text-gray-600 break-words">{user?.email || "user@example.com"}</p>
        <p className="text-xs text-gray-500 mt-1">Member since {getMemberSince()}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm md:text-base ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-6 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm md:text-base"
        >
          <LogOut className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}



// "use client"
// import { User, Package, Settings, Heart, MapPin, CreditCard, LogOut } from "lucide-react"

// export default function ProfileSidebar({ user, activeTab, setActiveTab }) {
//   const menuItems = [
//     { id: "overview", label: "Overview", icon: User },
//     { id: "orders", label: "My Orders", icon: Package },
//     { id: "wishlist", label: "Wishlist", icon: Heart },
//     { id: "addresses", label: "Addresses", icon: MapPin },
//     { id: "payments", label: "Payment Methods", icon: CreditCard },
//     { id: "settings", label: "Account Settings", icon: Settings },
//   ]

//   return (
//     <div className="bg-white rounded-lg border p-6">
//       {/* User Info */}
//       <div className="text-center mb-6 pb-6 border-b">
//         <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
//           <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
//         </div>
//         <h3 className="font-semibold text-gray-900">{user.name}</h3>
//         <p className="text-sm text-gray-600">{user.email}</p>
//         <p className="text-xs text-gray-500 mt-1">Member since {user.memberSince}</p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="space-y-1">
//         {menuItems.map((item) => {
//           const Icon = item.icon
//           return (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
//                 activeTab === item.id
//                   ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           )
//         })}
//       </nav>

//       {/* Logout Button */}
//       <div className="mt-6 pt-6 border-t">
//         <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//           <LogOut className="w-5 h-5" />
//           <span className="font-medium">Sign Out</span>
//         </button>
//       </div>
//     </div>
//   )
// }
