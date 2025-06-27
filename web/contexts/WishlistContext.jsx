/**
 * Wishlist Context
 * Manages wishlist items and operations
 * Requires user authentication to function
 */
"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { isLoggedIn, user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])

  // Load wishlist from localStorage when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`)
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist))
      }
    } else {
      setWishlistItems([])
    }
  }, [isLoggedIn, user])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, isLoggedIn, user])

  const addToWishlist = (product) => {
    if (!isLoggedIn) {
      return { success: false, message: "Please sign in to add items to wishlist" }
    }

    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === product.id)
    if (isAlreadyInWishlist) {
      return { success: false, message: "Item already in wishlist" }
    }

    setWishlistItems((prev) => [...prev, { ...product, addedAt: new Date().toISOString() }])
    return { success: true, message: "Added to wishlist" }
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
    return { success: true, message: "Removed from wishlist" }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
