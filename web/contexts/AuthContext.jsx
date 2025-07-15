"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      value={{ user, isLoggedIn, isLoading, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
