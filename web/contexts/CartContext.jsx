"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isLoggedIn, user, setUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const loadCart = async () => {
      const stored = localStorage.getItem("cart");

      if (!isLoggedIn) {
        setCartItems(stored ? JSON.parse(stored) : []);
        return;
      }

      if (isLoggedIn && (!user || !user.cart)) {
        return;
      }

      const items = await buildCartItemsFromUser(user.cart || []);
      setCartItems(items);
      localStorage.setItem("cart", JSON.stringify(items));
    };

    loadCart();
  }, [isLoggedIn, user]);

  const fetchProductById = async (id) => {
    try {
      const res = await axios.get(`/api/product/${id}`);
      return res.data.product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const buildCartItemsFromUser = async (cart) => {
    const items = await Promise.all(
      cart.map(async ({ productId, quantity }) => {
        const product = await fetchProductById(productId);
        return product ? { ...product, quantity } : null;
      })
    );
    return items.filter(Boolean);
  };

  useEffect(() => {
    const loadCart = async () => {
      if (isLoggedIn) {
        try {
          const res = await axios.get("/api/cart", {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });

          const serverCart = res.data.items || [];

          const items = await buildCartItemsFromUser(
            serverCart.map(({ productId, quantity }) => ({
              productId,
              quantity,
            }))
          );

          setCartItems(items);

          const summarized = items.map(
            ({ _id, name, price, images, discount, quantity }) => ({
              _id,
              name,
              price,
              images,
              discount,
              quantity,
            })
          );

          localStorage.setItem("cart", JSON.stringify(summarized));
        } catch (err) {
          console.error("Error loading cart from API:", err);
          setCartItems([]);
        }
      } else {
        const stored = localStorage.getItem("cart");
        setCartItems(stored ? JSON.parse(stored) : []);
      }
    };

    loadCart();
  }, [isLoggedIn, user]);

  const updateUserCart = (newCart) => {
    if (setUser && user) {
      setUser({ ...user, cart: newCart });
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const pid = product._id || product.id;
    if (!pid) return { success: false, message: "Invalid product" };

    if (!isLoggedIn) {
      const local = [...cartItems];
      const idx = local.findIndex((item) => item._id === pid);
      if (idx !== -1) local[idx].quantity += quantity;
      else local.push({ ...product, quantity });

      setCartItems(local);
      localStorage.setItem("cart", JSON.stringify(local));
      return { success: true, message: "Added to cart (local)" };
    }

    try {
      const res = await axios.post(
        "/api/cart/add",
        {
          productId: pid,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const productDetails = await fetchProductById(pid);

      setCartItems((prev) => {
        const found = prev.find((item) => item._id === pid);
        if (found) {
          return prev.map((item) =>
            item._id === pid
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prev, { ...productDetails, quantity }];
        }
      });

      const currentCart = user.cart || [];
      const updatedCart = currentCart.find((i) => i.productId === pid)
        ? currentCart.map((i) =>
            i.productId === pid ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...currentCart, { productId: pid, quantity }];
      updateUserCart(updatedCart);

      return { success: true, message: "Added to cart" };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Failed to add to cart" };
    }
  };
  const removeFromCart = async (productId) => {
    const pid = productId;

    if (!isLoggedIn) {
      const updatedCartItems = cartItems.filter((item) => item._id !== pid);
      setCartItems(updatedCartItems);

      const summarized = updatedCartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        images: item.images,
        discount: item.discount,
      }));
      localStorage.setItem("cart", JSON.stringify(summarized));

      return { success: true, message: "Removed from cart (local)" };
    }

    try {
      const apiCart = await axios.get("/api/cart", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`, // optional, if using JWT
        },
      });
      const itemToDelete = apiCart.data.items?.find(
        (item) => item.productId === pid || item._id === pid
      );

      if (!itemToDelete?._id) throw new Error("Cart item not found in DB");

      // 2. Call backend API to delete
      await axios.delete(`/api/cart/${itemToDelete._id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`, // optional, if using JWT
        },
      });

      // 3. Update user's cart (client-side)
      const updatedUserCart = (user.cart || []).filter(
        (c) => c.productId !== pid
      );
      updateUserCart(updatedUserCart);

      const updatedCartItems = cartItems.filter((item) => item._id !== pid);
      setCartItems(updatedCartItems);

      const summarized = updatedCartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        images: item.images,
        discount: item.discount,
      }));
      localStorage.setItem("cart", JSON.stringify(summarized));

      return { success: true, message: "Removed from cart" };
    } catch (err) {
      console.error("Error removing from cart:", err);
      return { success: false, message: "Failed to remove item" };
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return await removeFromCart(productId);

    if (!isLoggedIn) {
      const updated = cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { success: true, message: "Quantity updated (local)" };
    }

    try {
      await axios.patch(
        `/api/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // optional, if using JWT
          },
        }
      );

      const updatedCart = (user?.cart || []).map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      updateUserCart(updatedCart);

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      return { success: true, message: "Quantity updated" };
    } catch (error) {
      console.error("Error updating quantity:", error);
      return { success: false, message: "Failed to update quantity" };
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn) {
      localStorage.removeItem("cart");
      setCartItems([]);
      return { success: true, message: "Cart cleared (local)" };
    }

    try {
      const res = await axios.get("/api/cart");
      const itemIds = res.data.items?.map((item) => item._id) || [];

      await Promise.all(itemIds.map((id) => axios.delete(`/api/cart/${id}`)));

      setCartItems([]);
      return { success: true, message: "Cart cleared" };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, message: "Failed to clear cart" };
    }
  };

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartCount = () =>
    cartItems.reduce((count, item) => count + item.quantity, 0);

  const isInCart = (productId) =>
    cartItems.some((item) => item._id === productId);

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
        setCartItems,
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
