/**
 * Electronics Category Page
 * Displays electronics products with filtering, sorting, and search
 * Responsive grid layout with category navigation
 */
"use client"
import { useState } from "react"
import Header from "../../../components/Layout/Header/Header"
import Footer from "../../../components/Layout/Footer/Footer"
import ProductCard from "../../../components/ProductCard/ProductCard"
import CategoryFilter from "../../../components/Category/CategoryFilter/CategoryFilter"
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react"

export default function ElectronicsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock electronics products data
  const electronicsProducts = [
    {
      id: "elec-1",
      title: 'Samsung 65" 4K Smart TV',
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.5,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Best Seller",
      category: "TVs",
    },
    {
      id: "elec-2",
      title: "Apple iPhone 15 Pro Max",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviews: 2156,
      image: "/placeholder.svg?height=300&width=300",
      badge: "New",
      category: "Smartphones",
    },
    {
      id: "elec-3",
      title: "Sony WH-1000XM5 Headphones",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviews: 892,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Save $50",
      category: "Audio",
    },
    {
      id: "elec-4",
      title: "MacBook Air M2",
      price: 1099.99,
      originalPrice: 1199.99,
      rating: 4.6,
      reviews: 1567,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Popular",
      category: "Laptops",
    },
    {
      id: "elec-5",
      title: "Nintendo Switch OLED",
      price: 349.99,
      rating: 4.8,
      reviews: 3421,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Hot Deal",
      category: "Gaming",
    },
    {
      id: "elec-6",
      title: 'iPad Pro 12.9"',
      price: 1099.99,
      originalPrice: 1199.99,
      rating: 4.7,
      reviews: 987,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Save $100",
      category: "Tablets",
    },
  ]

  const categories = [
    { name: "All Electronics", count: electronicsProducts.length },
    { name: "TVs", count: 1 },
    { name: "Smartphones", count: 1 },
    { name: "Audio", count: 1 },
    { name: "Laptops", count: 1 },
    { name: "Gaming", count: 1 },
    { name: "Tablets", count: 1 },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-900">Electronics</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Electronics</h1>
          <p className="text-gray-600">Discover the latest in technology and electronics</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search electronics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600"}`}
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
              <p className="text-gray-600">{electronicsProducts.length} results</p>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {electronicsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
