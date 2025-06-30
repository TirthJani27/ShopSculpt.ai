/**
 * Grocery Category Page
 * Displays grocery and essential items with department filtering
 * Responsive layout with grocery-specific categories
 */
"use client"
import { useState } from "react"
import Header from "../../../components/Layout/Header/Header"
import Footer from "../../../components/Layout/Footer/Footer"
import ProductCard from "../../../components/ProductCard/ProductCard"
import CategoryFilter from "../../../components/Category/CategoryFilter/CategoryFilter"
import { Search, Filter, Grid, List, ChevronDown, Truck } from "lucide-react"

export default function GroceryPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock grocery products data
  const groceryProducts = [
    {
      id: "grocery-1",
      title: "Organic Bananas (2 lbs)",
      price: 2.99,
      originalPrice: 3.49,
      rating: 4.5,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Organic",
      category: "Fresh Produce",
    },
    {
      id: "grocery-2",
      title: "Whole Milk (1 Gallon)",
      price: 3.99,
      rating: 4.3,
      reviews: 856,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Fresh",
      category: "Dairy",
    },
    {
      id: "grocery-3",
      title: "Bread Loaf - Whole Wheat",
      price: 2.49,
      originalPrice: 2.99,
      rating: 4.4,
      reviews: 567,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Save 50¢",
      category: "Bakery",
    },
    {
      id: "grocery-4",
      title: "Ground Beef (1 lb)",
      price: 5.99,
      rating: 4.6,
      reviews: 432,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Fresh",
      category: "Meat & Seafood",
    },
    {
      id: "grocery-5",
      title: "Pasta - Spaghetti",
      price: 1.99,
      originalPrice: 2.49,
      rating: 4.2,
      reviews: 789,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Pantry Staple",
      category: "Pantry",
    },
    {
      id: "grocery-6",
      title: "Greek Yogurt (32 oz)",
      price: 4.99,
      originalPrice: 5.99,
      rating: 4.7,
      reviews: 1123,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Protein Rich",
      category: "Dairy",
    },
  ]

  const categories = [
    { name: "All Grocery", count: groceryProducts.length },
    { name: "Fresh Produce", count: 1 },
    { name: "Dairy", count: 2 },
    { name: "Bakery", count: 1 },
    { name: "Meat & Seafood", count: 1 },
    { name: "Pantry", count: 1 },
    { name: "Frozen Foods", count: 0 },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "alphabetical", label: "A to Z" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span>{" "}
            <span className="text-gray-900">Grocery & Essentials</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grocery & Essentials</h1>
          <p className="text-gray-600">Fresh groceries and everyday essentials delivered to your door</p>
        </div>

        {/* Delivery Banner */}
        <div className="bg-green-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Free Grocery Delivery</h3>
                <p>On orders over $35. Same-day delivery available!</p>
              </div>
            </div>
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
              Learn More
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
                placeholder="Search groceries..."
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
              <p className="text-gray-600">{groceryProducts.length} results</p>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {groceryProducts.map((product) => (
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
