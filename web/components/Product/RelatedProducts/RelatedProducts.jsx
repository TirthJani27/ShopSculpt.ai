/**
 * Related Products Component
 * Displays products related to the current product
 * Includes "You might also like" and "Frequently bought together" sections
 */
"use client"
import { useState } from "react"
import ProductCard from "../../ProductCard/ProductCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RelatedProducts({ currentProductId }) {
  const [activeTab, setActiveTab] = useState("related")

  // Mock related products data
  const relatedProducts = [
    {
      id: "related-1",
      title: "Similar Platform Bed Frame",
      price: 249.99,
      originalPrice: 329.99,
      rating: 4.3,
      reviews: 856,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Similar Style",
    },
    {
      id: "related-2",
      title: "Matching Nightstand Set",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 432,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Perfect Match",
    },
    {
      id: "related-3",
      title: "Bedroom Dresser",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.4,
      reviews: 567,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Complete Set",
    },
    {
      id: "related-4",
      title: "Comfort Mattress",
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.7,
      reviews: 1234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Best Seller",
    },
    {
      id: "related-5",
      title: "Bedroom Mirror",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.2,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Decorative",
    },
    {
      id: "related-6",
      title: "Bedside Lamp",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.5,
      reviews: 345,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Ambient",
    },
  ]

  const frequentlyBoughtTogether = [
    {
      id: "bundle-1",
      title: "Platform Bed + Mattress Bundle",
      price: 799.99,
      originalPrice: 999.99,
      rating: 4.8,
      reviews: 567,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Save $200",
    },
    {
      id: "bundle-2",
      title: "Complete Bedroom Set",
      price: 1299.99,
      originalPrice: 1599.99,
      rating: 4.6,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Bundle Deal",
    },
    {
      id: "bundle-3",
      title: "Bed Frame + Nightstands",
      price: 449.99,
      originalPrice: 549.99,
      rating: 4.5,
      reviews: 432,
      image: "/placeholder.svg?height=300&width=300",
      badge: "Popular Combo",
    },
  ]

  const tabs = [
    { id: "related", label: "You might also like", products: relatedProducts },
    { id: "bundles", label: "Frequently bought together", products: frequentlyBoughtTogether },
  ]

  const currentProducts = tabs.find((tab) => tab.id === activeTab)?.products || []

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {currentProducts.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bundle Savings Info */}
      {activeTab === "bundles" && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">Bundle & Save</h4>
              <p className="text-sm text-green-700">Save up to $300 when you buy items together</p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
              View All Bundles
            </button>
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {relatedProducts.slice(0, 6).map((product) => (
            <div key={`recent-${product.id}`} className="group">
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h4>
              <p className="text-sm font-bold text-gray-900">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <button className="text-blue-600 hover:text-blue-700 font-medium">View All Related Products →</button>
      </div>
    </div>
  )
}
