/**
 * Furniture Category Page
 * Displays furniture products with room-based filtering and style categories
 * Responsive layout with furniture-specific filters and room inspiration
 */
"use client"
import { useState } from "react"
import Header from "../../../components/Layout/Header/Header"
import Footer from "../../../components/Layout/Footer/Footer"
import ProductCard from "../../../components/ProductCard/ProductCard"
import CategoryFilter from "../../../components/Category/CategoryFilter/CategoryFilter"
import { Search, Filter, Grid, List, ChevronDown, Home, Sofa, Bed } from "lucide-react"

export default function FurniturePage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("all")

  // Mock furniture products data
  const furnitureProducts = [
    {
      id: "furniture-1",
      title: "Comfortable Sofa",
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.5,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Best Seller",
      category: "Living Room",
      room: "living-room",
      style: "Modern",
    },
    {
      id: "furniture-2",
      title: "Wooden Bed Frame",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.7,
      reviews: 856,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Save $300",
      category: "Bedroom",
      room: "bedroom",
      style: "Contemporary",
    },
    {
      id: "furniture-3",
      title: "Dining Table Set",
      price: 749.99,
      originalPrice: 899.99,
      rating: 4.4,
      reviews: 567,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Popular",
      category: "Dining Room",
      room: "dining-room",
      style: "Traditional",
    },
    {
      id: "furniture-4",
      title: "Office Chair",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 432,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Office Essential",
      category: "Office",
      room: "office",
      style: "Modern",
    },
    {
      id: "furniture-5",
      title: "Kids Desk",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.3,
      reviews: 789,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Space Saver",
      category: "Kids",
      room: "kids",
      style: "Fun",
    },
    {
      id: "furniture-6",
      title: "Outdoor Lounge Chair",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.5,
      reviews: 1123,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Weather Resistant",
      category: "Outdoor",
      room: "outdoor",
      style: "Casual",
    },
    {
      id: "furniture-7",
      title: "Comfortable Armchair",
      price: 349.99,
      originalPrice: 449.99,
      rating: 4.8,
      reviews: 654,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Comfort Plus",
      category: "Living Room",
      room: "living-room",
      style: "Traditional",
    },
    {
      id: "furniture-8",
      title: "Nightstand",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.2,
      reviews: 345,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Affordable",
      category: "Bedroom",
      room: "bedroom",
      style: "Modern",
    },
  ]

  const categories = [
    { name: "All Furniture", count: furnitureProducts.length },
    { name: "Living Room", count: 2 },
    { name: "Bedroom", count: 2 },
    { name: "Dining Room", count: 1 },
    { name: "Office", count: 1 },
    { name: "Kids", count: 1 },
    { name: "Outdoor", count: 1 },
  ]

  const rooms = [
    { id: "all", name: "All Rooms", icon: Home },
    { id: "living-room", name: "Living Room", icon: Sofa },
    { id: "bedroom", name: "Bedroom", icon: Bed },
    { id: "dining-room", name: "Dining Room", icon: Home },
    { id: "office", name: "Office", icon: Home },
    { id: "kids", name: "Kids Room", icon: Home },
    { id: "outdoor", name: "Outdoor", icon: Home },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "New Arrivals" },
  ]

  const filteredProducts =
    selectedRoom === "all" ? furnitureProducts : furnitureProducts.filter((product) => product.room === selectedRoom)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-900">Furniture</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Furniture</h1>
          <p className="text-gray-600">Find the perfect furniture for your home</p>
        </div>

        {/* Furniture Inspiration Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-8 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Furniture Sale</h2>
              <p className="text-lg mb-6">Up to 40% off on selected furniture collections.</p>
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
                Shop Collection
              </button>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 rounded-lg p-6 text-center">
                <Home className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Design Consultation</h3>
                <p className="text-sm">Get expert advice for your space</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Filter Tabs */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Shop by Room</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {rooms.map((room) => {
              const Icon = room.icon
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                    selectedRoom === room.id ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">{room.name}</span>
                </button>
              )
            })}
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
                placeholder="Search furniture..."
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

            {/* Additional Furniture-Specific Filters */}
            <div className="bg-white rounded-lg border p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Style</h3>
              <div className="space-y-2">
                {["Modern", "Traditional", "Contemporary", "Rustic", "Industrial"].map((style, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input type="checkbox" className="text-blue-600" />
                    <span className="text-sm text-gray-700">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Material</h3>
              <div className="space-y-2">
                {["Wood", "Metal", "Fabric", "Leather", "Glass"].map((material, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input type="checkbox" className="text-blue-600" />
                    <span className="text-sm text-gray-700">{material}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredProducts.length} results
                {selectedRoom !== "all" && (
                  <span className="ml-2 text-blue-600">in {rooms.find((r) => r.id === selectedRoom)?.name}</span>
                )}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No furniture found</h3>
                <p className="text-gray-600">Try selecting a different room or adjusting your filters</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Furniture Services Section */}
        <div className="mt-16 bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Furniture Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Assembly</h3>
              <p className="text-gray-600 text-sm">Professional assembly service available for most furniture items</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sofa className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">White Glove Delivery</h3>
              <p className="text-gray-600 text-sm">Premium delivery service with room placement and setup</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bed className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Design Consultation</h3>
              <p className="text-gray-600 text-sm">Expert design advice to help you create your perfect space</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
