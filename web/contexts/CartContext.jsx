"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

async function fetchProductById(id) {
  try {
    const res = await axios.get(`/api/products/${id}`);
    return res.data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isLoggedIn, user, setUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function loadCart() {
      if (isLoggedIn && user && Array.isArray(user.cart)) {
        const items = await Promise.all(
          user.cart.map(async ({ productId, quantity }) => {
            const product = await fetchProductById(productId);
            return { ...product, quantity };
          })
        );
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    }
    loadCart();
  }, [isLoggedIn, user]);

  // Helper to update user.cart
  const updateUserCart = (newCart) => {
    if (setUser) {
      setUser({ ...user, cart: newCart });
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isLoggedIn) {
      return { success: false, message: "Please sign in to add items to cart" };
    }
    const existing = user.cart?.find((item) => item.productId === product.id);
    let newCart;
    if (existing) {
      newCart = user.cart.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else
      newCart = [...(user.cart || []), { productId: product.id, quantity }];

    updateUserCart(newCart);
    // Update local cartItems state
    const productDetails = await fetchProductById(product.id);
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...productDetails, quantity }];
      }
    });
    return { success: true, message: "Added to cart" };
  };

  const removeFromCart = (productId) => {
    const newCart = (user.cart || []).filter(
      (item) => item.productId !== productId
    );
    updateUserCart(newCart);
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    return { success: true, message: "Removed from cart" };
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      return removeFromCart(productId);
    }
    const newCart = (user.cart || []).map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    updateUserCart(newCart);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    return { success: true, message: "Quantity updated" };
  };

  const clearCart = () => {
    updateUserCart([]);
    setCartItems([]);
    return { success: true, message: "Cart cleared" };
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

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
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
