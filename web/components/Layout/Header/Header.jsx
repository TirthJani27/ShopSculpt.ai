
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  LogOut,
  Clock,
  TrendingUp,
  Package,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWishlist } from "../../../contexts/WishlistContext";
import { useCart } from "../../../contexts/CartContext";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartPrompt, setShowCartPrompt] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const addToRecentSearches = (searchItem) => {
    if (!searchItem) return;
    const item =
      typeof searchItem === "string"
        ? { name: searchItem.trim(), type: "search" }
        : {
            name: searchItem.name?.trim(),
            id: searchItem.id,
            type: "product",
            category: searchItem.category,
            price: searchItem.price,
            image: searchItem.image,
          };
    if (!item.name) return;
    try {
      const existing = JSON.parse(localStorage.getItem("recentSearches")) || [];
      const filtered = existing.filter(
        (existingItem) =>
          existingItem.name !== item.name || existingItem.type !== item.type
      );
      const updated = [item, ...filtered].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (err) {
      console.error("Local storage error:", err);
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {
      setRecentSearches([]);
    }
  }, []);

  const debounceSearch = useCallback((value) => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 300);
  }, []);

  const searchProducts = useCallback(async (query, controller) => {
    if (!query.trim()) return [];
    try {
      const res = await fetch(`/api/product/search?q=${encodeURIComponent(query)}`, {
        signal: controller?.signal,
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const products = data.products || data || [];
      return products.map((product) => ({
        id: product._id || product.id,
        name: product.name || "Unknown Product",
        category: product.category || "General",
        price: product.price ? `₹${product.price}` : "N/A",
        popular: product.popular || false,
        image: product.images?.[0] || product.image || null,
      }));
    } catch (err) {
      if (err.name !== "AbortError") console.error("Search error:", err);
      return [];
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const doSearch = async () => {
      if (!debouncedSearchTerm.trim()) {
        setFilteredProducts([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      const results = await searchProducts(debouncedSearchTerm, controller);
      if (!controller.signal.aborted) setFilteredProducts(results);
      setIsSearching(false);
    };
    doSearch();
    return () => {
      controller.abort();
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, [debouncedSearchTerm, searchProducts]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debounceSearch(value);
    setShowDropdown(true);
  };

  const handleSearch = (query) => {
    if (!query?.trim()) return;
    addToRecentSearches(query);
    setSearchTerm(query);
    setShowDropdown(false);
    saveSearchToBackend(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleProductClick = (product) => {
    if (!product?.id) return;
    setSearchTerm(product.name);
    setShowDropdown(false);
    addToRecentSearches(product);
    saveSearchToBackend(product);
    router.push(`/product/${product.id}`);
  };

  const handleRecentItemClick = (item) => {
    setSearchTerm(item.name);
    setShowDropdown(false);
    if (item.type === "product" && item.id) {
      router.push(`/product/${item.id}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(item.name)}`);
    }
  };

  const saveSearchToBackend = async (searchItem) => {
    if (!user || !searchItem) return;
    try {
      const payload =
        typeof searchItem === "string"
          ? { keyword: searchItem, type: "search" }
          : {
              keyword: searchItem.name,
              productId: searchItem.id,
              type: "product",
              category: searchItem.category,
            };
      await axios.post("/api/user/search-history", payload, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (err) {
      console.error("Failed to save search:", err);
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowDropdown(false);
      setIsSearchFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleCartClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowCartPrompt(true);
      setTimeout(() => setShowCartPrompt(false), 3000);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) handleSearch(searchTerm);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50">
      {/* Cart Prompt Modal */}
      {showCartPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Login Required</h3>
            <p className="mb-4">Please log in to view your cart.</p>
            <div className="flex space-x-4">
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowCartPrompt(false)}
              >
                Login
              </Link>
              <button
                onClick={() => setShowCartPrompt(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-blue-700 py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            {/* Empty Block */}
            <div className="flex items-center space-x-1">
              {/* Empty Block */}
            </div>
          </div>
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:underline flex items-center space-x-1"
              >
                <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white text-gray-900 rounded-lg shadow-lg py-2 w-48 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/profile?tab=orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex w-50 h-20 mt-6 mb-5 mr-4">
          <img
            src="/logo4.png"
            alt="ShopSculpt Logo"
            className="max-w-full h-auto"
          />
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
          <div className="relative w-full">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setShowDropdown(true);
                }}
                placeholder="Search everything at ShopSculpt"
                className={`w-full py-3 px-4 pr-12 rounded-full text-black border-2 transition-all duration-300 focus:outline-none ${
                  isSearchFocused
                    ? "border-blue-500 shadow-lg shadow-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-autocomplete="list"
                aria-controls="search-dropdown"
              />
            </form>

            {showDropdown && (
              <div
                id="search-dropdown"
                role="listbox"
                className="absolute z-50 left-0 right-0 bg-white text-black rounded-xl shadow-2xl mt-2 max-h-96 overflow-hidden border border-gray-100"
              >
                {/* Search Results */}
                {searchTerm.trim() !== "" && (
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-3 bg-gray-50 flex items-center space-x-2">
                      {isSearching ? (
                        <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {isSearching ? "Searching..." : "Search Results"}
                      </span>
                      {!isSearching && filteredProducts.length > 0 && (
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                          {filteredProducts.length} found
                        </span>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                          Searching products...
                        </div>
                      ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                          <div
                            key={product.id || index}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 group"
                            onClick={() => handleProductClick(product)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-blue-100 transition-colors">
                                  {product.image ? (
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                          "flex";
                                      }}
                                    />
                                  ) : null}
                                  <Package className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    in {product.category}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right space-y-1">
                                <div className="font-semibold text-gray-900">
                                  {product.price}
                                </div>
                                {product.popular && (
                                  <div className="text-xs text-blue-600 flex items-center justify-end space-x-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Popular</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No results found for "{searchTerm}"</p>
                          <p className="text-sm mt-1">Try different keywords</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recent Searches */}
                {searchTerm.trim() === "" && recentSearches.length > 0 && (
                  <div>
                    <div className="px-4 py-3 bg-gray-50 flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Recent Searches
                      </span>
                    </div>
                    <div className="py-2">
                      {recentSearches.map((item, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 group"
                          onClick={() => handleRecentItemClick(item)}
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            {item.type === "product" ? (
                              <>
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-blue-100 transition-colors">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                          "flex";
                                      }}
                                    />
                                  ) : null}
                                  <Package className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-700 font-medium">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {item.category} • {item.price}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {item.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full py-2 px-3 pr-10 rounded-full text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <Link
            href="/wishlist"
            className="flex items-center hover:bg-blue-500 p-2 rounded relative"
          >
            <Heart className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href={isLoggedIn ? "/profile" : "/auth/login"}
            className="hover:bg-blue-500 p-2 rounded"
          >
            <User className="w-6 h-6" />
          </Link>
          <Link
            href="/cart"
            onClick={handleCartClick}
            className="relative hover:bg-blue-500 p-2 rounded"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-500 rounded"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-500">
          <div className="px-4 py-2 space-y-2">
            <Link
              href="/categories"
              className="block py-2 hover:bg-blue-600 rounded px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="block py-2 hover:bg-blue-600 rounded px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            {!isLoggedIn && (
              <Link
                href="/auth/login"
                className="block py-2 hover:bg-blue-600 rounded px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
      <nav
        className={`bg-blue-700 border-t border-blue-500 delay-200 ${
          isMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="max-w-7xl flex flex-col items-center mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-2 text-sm">
            <Link
              href="/"
              className="py-2 md:py-0 cursor-pointer hover:underline flex items-center space-x-1"
            >
              <span>Home</span>
            </Link>
            <Link
              href="/categories/grocery"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Grocery
            </Link>
            <Link
              href="/categories/electronics"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Electronics
            </Link>
            <Link
              href="/categories/mobile"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Mobiles
            </Link>
            <Link
              href="/categories/fashion"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Fashion
            </Link>
            <Link
              href="/categories/furniture"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Furniture
            </Link>
            <Link
              href="/categories/sports"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Sports
            </Link>
            <Link
              href="/categories/beauty"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Beauty
            </Link>

            <Link
              href="/ChatBot"
              className="py-2 md:py-0 cursor-pointer hover:underline"
            >
              Help
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
