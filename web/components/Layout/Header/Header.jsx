/**
 * Enhanced Header Component
 * Includes navigation, search, user authentication, and cart functionality
 * Shows sign-in prompt for cart access when not logged in
 * Responsive design for all device sizes
 * Updated with Sports category
 */

"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, MapPin, Heart, Menu, X, Home, LogOut } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"
import { useWishlist } from "../../../contexts/WishlistContext"
import { useCart } from "../../../contexts/CartContext"

export default function Header() {
  const router = useRouter()
  const { isLoggedIn, user, logout } = useAuth()
  const { wishlistCount } = useWishlist()
  const { cartCount, cartTotal } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCartPrompt, setShowCartPrompt] = useState(false)

  const handleCartClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault()
      setShowCartPrompt(true)
    }
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.push("/")
  }

  return (
    <>
      <header className="bg-blue-600 text-white sticky top-0 z-50">
        {/* Top Information Bar */}
        <div className="bg-blue-700 py-1">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <span className="hidden md:block">How do you want your items?</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>Sacramento, 95829</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hover:underline flex items-center space-x-1"
                  >
                    <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white text-gray-900 rounded-lg shadow-lg py-2 w-48 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/profile?tab=orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              {/* <Link href="/" className="text-2xl font-bold mr-4 md:mr-8">
                ShopSculpt
              </Link> */}
              <Link href="/" className="flex flex-column mb-5 w-50 h-20 mt-6 mr-4 md:mr-8">
                  <img src="/logo4.png" alt="ShopSclupt" />
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search everything at ShopSculpt online and in store"
                  className="w-full py-3 px-4 pr-12 rounded-full text-black border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full">
                  <Search className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Mobile Search Icon */}
              <button className="md:hidden p-2 hover:bg-blue-500 rounded">
                <Search className="w-6 h-6" />
              </button>

              {/* Favorites/Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex items-center space-x-1 cursor-pointer hover:bg-blue-500 p-2 rounded relative"
              >
                <Heart className="w-6 h-6" />
                <span className="hidden lg:block">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link
                href={isLoggedIn ? "/profile" : "/auth/login"}
                className="hidden sm:flex items-center space-x-1 cursor-pointer hover:bg-blue-500 p-2 rounded"
              >
                <User className="w-6 h-6" />
                <span className="hidden lg:block">{isLoggedIn ? "Account" : "Sign In"}</span>
              </Link>

              {/* Shopping Cart */}
              <Link
                href="/cart"
                onClick={handleCartClick}
                className="flex items-center space-x-1 cursor-pointer hover:bg-blue-500 p-2 rounded relative"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="hidden lg:block">${cartTotal.toFixed(2)}</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden p-2 hover:bg-blue-500 rounded" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full text-black border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-1 rounded-full">
                <Search className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className={`bg-blue-700 border-t border-blue-500 ${isMenuOpen ? "block" : "hidden md:block"}`}>
          <div className="max-w-7xl  flex flex-col items-center mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-2 text-sm">
              <Link href="/" className="py-2 md:py-0 cursor-pointer hover:underline flex items-center space-x-1">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/categories/departments" className="py-2 md:py-0 cursor-pointer hover:underline">
                Departments
              </Link>
              <Link href="/services" className="py-2 md:py-0 cursor-pointer hover:underline">
                Services
              </Link>
              <Link href="/categories/grocery" className="py-2 md:py-0 cursor-pointer hover:underline">
                Grocery
              </Link>
              <Link href="/categories/electronics" className="py-2 md:py-0 cursor-pointer hover:underline">
                Electronics
              </Link>
              <Link href="/categories/fashion" className="py-2 md:py-0 cursor-pointer hover:underline">
                Fashion
              </Link>
              <Link href="/categories/furniture" className="py-2 md:py-0 cursor-pointer hover:underline">
                Furniture
              </Link>
              <Link href="/categories/sports" className="py-2 md:py-0 cursor-pointer hover:underline">
                Sports
              </Link>
              <Link href="/categories/auto" className="py-2 md:py-0 cursor-pointer hover:underline">
                Auto & tires
              </Link>
              <Link href="/pharmacy" className="py-2 md:py-0 cursor-pointer hover:underline">
                Pharmacy
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Sign-in Prompt Modal */}
      {showCartPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sign in to view your cart</h3>
            <p className="text-gray-600 mb-6">You need to be signed in to access your shopping cart and save items.</p>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-center"
                onClick={() => setShowCartPrompt(false)}
              >
                Sign In
              </Link>
              <button
                onClick={() => setShowCartPrompt(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 
