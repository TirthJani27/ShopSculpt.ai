/**
 * Product Information Component
 * Displays product details, features, specifications, and ratings
 * Responsive layout with expandable sections
 */
"use client"
import { useState } from "react"
import { Star, Heart, Share2, ChevronDown, ChevronUp, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductInfo({ product }) {
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [showAllSpecs, setShowAllSpecs] = useState(false)

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">{renderStars(product.rating)}</div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
            <Heart className="w-5 h-5" />
            <span className="text-sm">Add to Wishlist</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
            <Share2 className="w-5 h-5" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Price Display - Mobile */}
      <div className="lg:hidden bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
          <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">{product.discount}% off</span>
        </div>
        <p className="text-green-600 text-sm font-medium">
          You save ${(product.originalPrice - product.price).toFixed(2)}
        </p>
      </div>

      {/* Product Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product.features.slice(0, showAllFeatures ? product.features.length : 3).map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        {product.features.length > 3 && (
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="mt-3 flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <span>{showAllFeatures ? "Show Less" : "Show More"}</span>
            {showAllFeatures ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            {Object.entries(product.specifications)
              .slice(0, showAllSpecs ? Object.entries(product.specifications).length : 3)
              .map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-gray-600 font-medium">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
          </div>
          {Object.entries(product.specifications).length > 3 && (
            <button
              onClick={() => setShowAllSpecs(!showAllSpecs)}
              className="mt-3 flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <span>{showAllSpecs ? "Show Less" : "Show All Specifications"}</span>
              {showAllSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Delivery & Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery & Services</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Free Delivery</p>
              <p className="text-gray-600">On orders over $35</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Easy Returns</p>
              <p className="text-gray-600">10-day return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Warranty</p>
              <p className="text-gray-600">1-year manufacturer warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
