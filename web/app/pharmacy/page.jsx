/**
 * Pharmacy Page
 * Displays health and wellness products, medications, and pharmacy services
 * Responsive layout with health-specific categories
 */
"use client"
import { useState } from "react"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"
import ProductCard from "../../components/ProductCard/ProductCard"
import CategoryFilter from "../../components/Category/CategoryFilter/CategoryFilter"
import { Search, Filter, Grid, List, ChevronDown, Heart, Shield, Clock } from "lucide-react"

export default function PharmacyPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock pharmacy products data
  const pharmacyProducts = [
    {
      id: "pharmacy-1",
      title: "Multivitamin Tablets (90 count)",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.5,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Best Value",
      category: "Vitamins",
    },
    {
      id: "pharmacy-2",
      title: "Pain Relief Gel",
      price: 8.99,
      originalPrice: 11.99,
      rating: 4.3,
      reviews: 856,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Fast Acting",
      category: "Pain Relief",
    },
    {
      id: "pharmacy-3",
      title: "Blood Pressure Monitor",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviews: 567,
      image: "/placeholder.svg?height=300&width=300",
      badge: "FDA Approved",
      category: "Medical Devices",
    },
    {
      id: "pharmacy-4",
      title: "Omega-3 Fish Oil (120 softgels)",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.6,
      reviews: 432,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Heart Health",
      category: "Supplements",
    },
    {
      id: "pharmacy-5",
      title: "First Aid Kit - Complete",
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.4,
      reviews: 789,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Emergency Ready",
      category: "First Aid",
    },
    {
      id: "pharmacy-6",
      title: "Thermometer - Digital",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.5,
      reviews: 1123,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Accurate",
      category: "Medical Devices",
    },
  ]

  const categories = [
    { name: "All Health", count: pharmacyProducts.length },
    { name: "Vitamins", count: 1 },
    { name: "Pain Relief", count: 1 },
    { name: "Medical Devices", count: 2 },
    { name: "Supplements", count: 1 },
    { name: "First Aid", count: 1 },
    { name: "Personal Care", count: 0 },
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
            <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-900">Pharmacy</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pharmacy & Health</h1>
          <p className="text-gray-600">Your trusted source for health and wellness products</p>
        </div>

        {/* Health Services Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8" />
              <div>
                <h3 className="font-bold">Health Screenings</h3>
                <p className="text-sm">Free health checks available</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h3 className="font-bold">Prescription Services</h3>
                <p className="text-sm">Fast & reliable prescriptions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8" />
              <div>
                <h3 className="font-bold">24/7 Support</h3>
                <p className="text-sm">Pharmacist consultation available</p>
              </div>
            </div>
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
                placeholder="Search health products..."
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
              <p className="text-gray-600">{pharmacyProducts.length} results</p>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
              {pharmacyProducts.map((product) => (
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
