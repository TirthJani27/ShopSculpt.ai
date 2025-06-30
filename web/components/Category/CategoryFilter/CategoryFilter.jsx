/**
 * Category Filter Component
 * Sidebar filter component for category pages
 * Includes category filtering, price range, and other filters
 */
"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function CategoryFilter({ categories }) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRating, setSelectedRating] = useState("")

  // Mock brand data
  const brands = [
    { name: "Samsung", count: 45 },
    { name: "Apple", count: 32 },
    { name: "Nike", count: 28 },
    { name: "Sony", count: 23 },
    { name: "LG", count: 19 },
  ]

  const ratings = [
    { value: "4", label: "4 stars & up", count: 156 },
    { value: "3", label: "3 stars & up", count: 234 },
    { value: "2", label: "2 stars & up", count: 345 },
    { value: "1", label: "1 star & up", count: 456 },
  ]

  const handleBrandChange = (brandName) => {
    setSelectedBrands((prev) => (prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]))
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.slice(0, showAllCategories ? categories.length : 6).map((category, index) => (
            <label
              key={index}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <input type="radio" name="category" className="text-blue-600" />
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-xs text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
        {categories.length > 6 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>{showAllCategories ? "Show Less" : "Show More"}</span>
            {showAllCategories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="$0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="$1000"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium">
            Apply Price Filter
          </button>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand, index) => (
            <label
              key={index}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{brand.name}</span>
              </div>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Customer Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating, index) => (
            <label
              key={index}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="rating"
                  value={rating.value}
                  checked={selectedRating === rating.value}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">{rating.label}</span>
              </div>
              <span className="text-xs text-gray-500">({rating.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="bg-white rounded-lg border p-4">
        <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm">Clear All Filters</button>
      </div>
    </div>
  )
}
