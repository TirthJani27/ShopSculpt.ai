/**
 * Product Reviews Component
 * Displays customer reviews, ratings, and review statistics
 * Includes review filtering and sorting options
 */
"use client"
import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react"

export default function ProductReviews({ productId, rating, reviewCount }) {
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent quality and fast delivery!",
      content:
        "I'm really impressed with this product. The quality is outstanding and it arrived much faster than expected. Highly recommend!",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      author: "Mike R.",
      rating: 4,
      date: "2024-01-10",
      title: "Good value for money",
      content:
        "Overall satisfied with the purchase. Good quality and reasonable price. Only minor issue was the packaging could be better.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      author: "Jennifer L.",
      rating: 5,
      date: "2024-01-08",
      title: "Perfect for my needs",
      content:
        "Exactly what I was looking for. Works perfectly and looks great. Customer service was also very helpful when I had questions.",
      helpful: 15,
      verified: true,
    },
    {
      id: 4,
      author: "David K.",
      rating: 3,
      date: "2024-01-05",
      title: "Average product",
      content: "It's okay, nothing special. Does what it's supposed to do but I expected a bit more for the price.",
      helpful: 3,
      verified: false,
    },
  ]

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      distribution[review.rating]++
    })
    return distribution
  }

  const ratingDistribution = getRatingDistribution()

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest", label: "Highest Rating" },
    { value: "lowest", label: "Lowest Rating" },
    { value: "helpful", label: "Most Helpful" },
  ]

  const filterOptions = [
    { value: "all", label: "All Reviews" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
    { value: "verified", label: "Verified Purchases" },
  ]

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl font-bold text-gray-900">{rating}</div>
            <div>
              <div className="flex items-center mb-1">{renderStars(rating)}</div>
              <p className="text-sm text-gray-600">{reviewCount.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-6">{stars}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${(ratingDistribution[stars] / reviews.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{ratingDistribution[stars]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share your experience</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
            Write a Review
          </button>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 pb-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

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
        </div>

        <p className="text-sm text-gray-600">{reviews.length} reviews</p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Verified Purchase</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm">Not helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center mt-8">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}
