"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { isLoggedIn, user, setUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const favorites = user.favorites || [];
      setWishlistItems(favorites);
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(favorites));
    } else {
      setWishlistItems([]);
    }
  }, [isLoggedIn, user]);

  // Update localStorage when wishlistItems changes
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(
        `favorites_${user._id}`,
        JSON.stringify(wishlistItems)
      );
    }
  }, [wishlistItems, isLoggedIn, user]);

  const addToWishlist = async (product) => {
    if (!isLoggedIn) {
      return {
        success: false,
        message: "Please sign in to add items to wishlist",
      };
    }
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item.id === product.id
    );
    if (isAlreadyInWishlist) {
      return { success: false, message: "Item already in wishlist" };
    }
    try {
      const res = await fetch("/api/favorites/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (!res.ok) throw new Error("Failed to add to wishlist");
      setWishlistItems((prev) => [
        ...prev,
        { ...product, addedAt: new Date().toISOString() },
      ]);
      return { success: true, message: "Added to wishlist" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch("/api/favorites/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
      return { success: true, message: "Removed from wishlist" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

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
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
