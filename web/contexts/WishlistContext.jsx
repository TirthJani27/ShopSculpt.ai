"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { isLoggedIn, user, setUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  const storageKey =
    isLoggedIn && user ? `favorites_${user._id}` : "favorites_guest";

  // Load wishlist on init
  useEffect(() => {
    if (isLoggedIn && user) {
      const favorites = user.favorites || [];
      setWishlistItems(favorites);
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    } else {
      const stored = localStorage.getItem("favorites_guest");
      setWishlistItems(stored ? JSON.parse(stored) : []);
    }
  }, [isLoggedIn, user]);

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
  }, [wishlistItems, storageKey]);

  // Add to wishlist
  const addToWishlist = async (product) => {
    const productId = product._id || product.id;
    const exists = wishlistItems.some(
      (item) => (item._id || item.id) === productId
    );
    if (exists) {
      return { success: false, message: "Already in wishlist" };
    }

    if (!isLoggedIn) {
      const updated = [...wishlistItems, product];
      setWishlistItems(updated);
      return { success: true, message: "Added to wishlist (local)" };
    }

    try {
      const res = await axios.post(
        "/api/favorites/add",
        {
          productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status !== 200) throw new Error("Failed to add");

      const updated = [...wishlistItems, product];
      setWishlistItems(updated);
      setUser((prev) => ({
        ...prev,
        favorites: updated,
      }));
      return { success: true, message: "Added to wishlist" };
    } catch (err) {
      console.error("Wishlist Add Error:", err);
      return { success: false, message: "Failed to add to wishlist" };
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!productId) return { success: false, message: "Invalid product ID" };

    if (!isLoggedIn) {
      const updated = wishlistItems.filter(
        (item) => (item._id || item.id) !== productId
      );
      setWishlistItems(updated);
      return { success: true, message: "Removed from wishlist (local)" };
    }

    try {
      const res = await axios.post(
        "/api/favorites/remove",
        {
          productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status !== 200) throw new Error("Failed to remove");

      const updated = wishlistItems.filter(
        (item) => (item._id || item.id) !== productId
      );
      setWishlistItems(updated);
      setUser((prev) => ({
        ...prev,
        favorites: updated,
      }));
      return { success: true, message: "Removed from wishlist" };
    } catch (err) {
      console.error("Wishlist Remove Error:", err);
      return { success: false, message: "Failed to remove from wishlist" };
    }
  };

  // Helpers
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => (item._id || item.id) === productId);
  };

  const toggleWishlist = async (product) => {
    const productId = product._id || product.id;
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
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
