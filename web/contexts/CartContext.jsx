/**
 * Cart Context
 * Manages shopping cart items and operations
 * Requires user authentication to function
 */
"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

export function CartProvider({ children }) {
  const { isLoggedIn, user } = useAuth()
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } else {
      setCartItems([])
    }
  }, [isLoggedIn, user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, isLoggedIn, user])

  const addToCart = (product, quantity = 1) => {
    if (!isLoggedIn) {
      return { success: false, message: "Please sign in to add items to cart" }
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if item already exists
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        // Add new item to cart
        return [
          ...prev,
          {
            ...product,
            quantity,
            addedAt: new Date().toISOString(),
            // Ensure we have the required cart fields
            name: product.title || product.name,
            seller: product.seller || "ShopSculpt",
            image: product.image || "/placeholder.svg",
            inStock: product.inStock !== false,
            deliveryDate: "Tomorrow, Sat",
          },
        ]
      }
    })

    return { success: true, message: "Added to cart" }
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
    return { success: true, message: "Removed from cart" }
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      return removeFromCart(productId)
    }

    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
    return { success: true, message: "Quantity updated" }
  }

  const clearCart = () => {
    setCartItems([])
    return { success: true, message: "Cart cleared" }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
        cartCount: getCartCount(),
        cartTotal: getCartTotal(),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
