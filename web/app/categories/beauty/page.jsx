"use client"

import { useEffect, useState } from "react"
import Header from "../../../components/Layout/Header/Header"
import Footer from "../../../components/Layout/Footer/Footer"
import ProductCard from "../../../components/ProductCard/ProductCard"
import CategoryFilter from "../../../components/Category/CategoryFilter/CategoryFilter"
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react"

export default function BeautyPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [beautyProducts, setBeautyProducts] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const fetchBeautyProducts = async () => {
      try {
        const res = await fetch("/api/product/category/Beauty")
        const data = await res.json()
        const transformed = data.map((p) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          originalPrice: p.discount
            ? p.price / (1 - p.discount / 100)
            : p.price,
          rating: p.reviews?.[0]?.rating || 4.5,
          reviews: p.reviews?.length || 0,
          image: p.images?.[0] || "/placeholder.svg",
          badge:
            p.discount >= 30
              ? "Hot Deal"
              : p.discount > 0
              ? `Save ${p.discount}%`
              : "New Arrival",
          category: p.category || "General",
        }))
        setBeautyProducts(transformed)
      } catch (err) {
        console.error("Failed to fetch beauty products", err)
      }
    }

    fetchBeautyProducts()
  }, [])

  const filteredProducts = beautyProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [
    { name: "All Beauty", count: beautyProducts.length },
    ...Array.from(
      beautyProducts.reduce((map, product) => {
        const cat = product.category || "Uncategorized"
        map.set(cat, (map.get(cat) || 0) + 1)
        return map
      }, new Map())
    ).map(([name, count]) => ({ name, count })),
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "New Arrivals" },
  ]

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span>{" "}
            <span className="text-gray-900">Beauty</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Beauty & Personal Care</h1>
          <p className="text-gray-600">Discover top beauty picks for skincare, haircare, and more</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search beauty products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-pink-600 text-white" : "text-gray-600"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-pink-600 text-white" : "text-gray-600"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle - Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <CategoryFilter categories={categories} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">{filteredProducts.length} results</p>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
