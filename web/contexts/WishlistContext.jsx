"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { isLoggedIn, user, setUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const storageKey =
    isLoggedIn && user ? `favorites_${user._id}` : "favorites_guest";

  // Sync from backend if needed
  const syncFavoritesFromBackend = async () => {
    if (!isLoggedIn || !user) return;
    try {
      const res = await axios.get("/api/favorites", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200 && Array.isArray(res.data.favorites)) {
        const ids = res.data.favorites;
        setWishlistItems(ids);
        localStorage.setItem(storageKey, JSON.stringify(ids));
        setUser((prev) => ({
          ...prev,
          favorites: ids,
        }));
      }
    } catch (err) {
      console.error("Failed to sync favorites:", err);
    }
  };

  // Load from localStorage or user.favorites
  useEffect(() => {
    if (isLoggedIn === undefined) return;

    const init = () => {
      if (isLoggedIn && user) {
        const localIds = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const userIds = Array.isArray(user.favorites) ? user.favorites : [];

        const useIds = userIds.length > 0 ? userIds : localIds;

        setWishlistItems(useIds);
        localStorage.setItem(storageKey, JSON.stringify(useIds));

        if (userIds.length === 0 && localIds.length > 0) {
          setUser((prev) => ({
            ...prev,
            favorites: localIds,
          }));
        }

        if (useIds.length === 0) syncFavoritesFromBackend();
      } else {
        // Guest
        const guestIds = JSON.parse(
          localStorage.getItem("favorites_guest") || "[]"
        );
        setWishlistItems(guestIds);
      }

      setIsLoaded(true);
    };

    init();
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, storageKey, isLoaded]);

  // Add to wishlist (IDs only)
  const addToWishlist = async (productId) => {
    if (!productId || isInWishlist(productId)) {
      return { success: false, message: "Already in wishlist" };
    }

    const updated = [...wishlistItems, productId];
    setWishlistItems(updated);

    if (!isLoggedIn) {
      return { success: true, message: "Added to guest wishlist" };
    }

    try {
      const res = await axios.post(
        "/api/favorites/add",
        { productId },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setUser((prev) => ({
          ...prev,
          favorites: res.data.favorites || updated,
        }));
        return { success: true, message: res.data.message };
      }

      return { success: false, message: res.data.message };
    } catch (err) {
      console.error("Add to wishlist error:", err);
      return { success: false, message: "Failed to add" };
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!productId) return { success: false, message: "Invalid ID" };

    const updated = wishlistItems.filter((id) => id !== productId);
    setWishlistItems(updated);

    if (!isLoggedIn) {
      return { success: true, message: "Removed from guest wishlist" };
    }

    try {
      const res = await axios.post(
        "/api/favorites/remove",
        { productId },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setUser((prev) => ({
          ...prev,
          favorites: res.data.favorites || updated,
        }));
        return { success: true, message: res.data.message };
      }

      return { success: false, message: res.data.message };
    } catch (err) {
      console.error("Remove from wishlist error:", err);
      return { success: false, message: "Failed to remove" };
    }
  };

  const isInWishlist = (productId) => wishlistItems.includes(productId);

  const toggleWishlist = async (productId) => {
    return isInWishlist(productId)
      ? await removeFromWishlist(productId)
      : await addToWishlist(productId);
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
        syncFavoritesFromBackend,
        isLoaded,
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
