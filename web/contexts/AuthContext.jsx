"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * AuthContext
 * Manages single user authentication state across the application
 * Provides login, logout, and session persistence via localStorage
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login user and store session in localStorage
   * @param {Object} userData - User object (e.g., id, email, token)
   */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Logout user and clear session-related data from localStorage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("cart");
  };

  // Determine login state
  const isLoggedIn = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth
 * Custom hook to access authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
