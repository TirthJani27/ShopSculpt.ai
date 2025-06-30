/**
 * Authentication Context
 * Manages user authentication state across the application
 * Provides login, logout, and user state management
 * Updated with user registration validation
 */
"use client"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [registeredUsers, setRegisteredUsers] = useState([])

  // Load registered users and current user session on app load
  useEffect(() => {
    const savedUsers = localStorage.getItem("registeredUsers")
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers))
    }

    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save registered users to localStorage whenever it changes
  useEffect(() => {
    if (registeredUsers.length > 0) {
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
    }
  }, [registeredUsers])

  const register = (userData) => {
    // Add user to registered users list
    const newUser = {
      ...userData,
      id: Date.now(),
      registrationDate: new Date().toISOString(),
      registrationCompleted: true,
    }

    setRegisteredUsers((prev) => [...prev, newUser])
    return newUser
  }

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("wishlist")
    localStorage.removeItem("cart")
  }

  const isUserRegistered = (email) => {
    return registeredUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())
  }

  const getUserByEmail = (email) => {
    return registeredUsers.find((user) => user.email.toLowerCase() === email.toLowerCase())
  }

  const isLoggedIn = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        registeredUsers,
        login,
        logout,
        register,
        isUserRegistered,
        getUserByEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
