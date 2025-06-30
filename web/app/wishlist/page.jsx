/**
 * Wishlist Page
 * Displays user's saved wishlist items
 * Requires authentication to access
 */
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"
import WishlistItem from "../../components/Wishlist/WishlistItem/WishlistItem"
import { useAuth } from "../../contexts/AuthContext"
import { useWishlist } from "../../contexts/WishlistContext"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"

export default function WishlistPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()
  const { wishlistItems, removeFromWishlist } = useWishlist()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login?redirect=/wishlist")
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
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
            </div>
          </div>
          <Heart className="w-8 h-8 text-red-500" />
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon. We'll keep them safe here for you.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} onRemove={removeFromWishlist} />
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
