/**
 * Fashion Category Page
 * Displays fashion products with filtering by gender, size, brand
 * Responsive grid layout with fashion-specific filters
 */
"use client"
import { useState } from "react"
import Header from "../../../components/Layout/Header/Header"
import Footer from "../../../components/Layout/Footer/Footer"
import ProductCard from "../../../components/ProductCard/ProductCard"
import CategoryFilter from "../../../components/Category/CategoryFilter/CategoryFilter"
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react"

export default function FashionPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock fashion products data
  const fashionProducts = [
    {
      id: "fashion-1",
      title: "Stylish Summer Dress",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviews: 2341,
      image: "/placeholder.svg?height=300&width=300",
      badge: "30% off",
      category: "Dresses",
    },
    {
      id: "fashion-2",
      title: "Classic Denim Jeans",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.5,
      reviews: 1876,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Classic",
      category: "Jeans",
    },
    {
      id: "fashion-3",
      title: "Elegant Evening Gown",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 967,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Trending",
      category: "Dresses",
    },
    {
      id: "fashion-4",
      title: "Comfortable Running Shoes",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.8,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Best Seller",
      category: "Shoes",
    },
    {
      id: "fashion-5",
      title: "Fashionable Handbag",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.4,
      reviews: 543,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Luxury",
      category: "Accessories",
    },
    {
      id: "fashion-6",
      title: "Casual T-Shirt",
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.3,
      reviews: 789,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Sale",
      category: "Tops",
    },
  ]

  const categories = [
    { name: "All Fashion", count: fashionProducts.length },
    { name: "Dresses", count: 2 },
    { name: "Jeans", count: 1 },
    { name: "Shoes", count: 1 },
    { name: "Accessories", count: 1 },
    { name: "Tops", count: 1 },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "New Arrivals" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-900">Fashion</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fashion</h1>
          <p className="text-gray-600">Discover the latest trends in fashion and style</p>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Summer Collection 2024</h2>
            <p className="text-lg mb-6">Discover the hottest trends and styles for this season</p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              Shop Collection
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search fashion items..."
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
              <p className="text-gray-600">{fashionProducts.length} results</p>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {fashionProducts.map((product) => (
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
