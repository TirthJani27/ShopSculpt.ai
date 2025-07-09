"use client";
import {
  User,
  Package,
  Settings,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "cart", label: "My Cart", icon: ShoppingCart },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      logout();
      window.location.href = "/";
    }
  };

  const getMemberSince = () => {
    if (user?.registrationDate) {
      try {
        return new Date(user.registrationDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
        });
      } catch {
        return "2025";
      }
    }
    return "2025";
  };

  return (
    <aside
      className="bg-white rounded-lg border p-4 md:p-6 w-full max-w-xs mx-auto md:mx-0"
      aria-label="Profile sidebar"
    >
      <div className="text-center mb-6 pb-6 border-b">
        <div className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow">
          <span className="text-white text-lg md:text-2xl font-bold select-none">
            {user?.fullname?.firstname[0].toUpperCase() +
              user?.fullname?.lastname[0].toUpperCase() || "U"}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm md:text-base break-words truncate">
          {user?.fullname?.firstname + " " + user?.fullname?.lastname || "User"}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 break-words truncate">
          {user?.email || "user@example.com"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Member since {getMemberSince()}
        </p>
      </div>

      <nav className="space-y-1 mt-2" aria-label="Profile navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
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
          );
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
    </aside>
  );
}
