"use client";
import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

function getRandomDate() {
  const start = new Date("2024-01-01");
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default function ProductReviews({ product }) {
  const [filterBy, setFilterBy] = useState("all");
  const rating = product.averageRating;
  const reviewCount = product.reviews.length;

  const reviews = product.reviews;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const filterOptions = [
    { value: "all", label: "All Reviews" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  const filteredReviews =
    filterBy === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(filterBy));

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl font-bold text-gray-900">{rating}</div>
            <div>
              <div className="flex items-center mb-1">
                {renderStars(rating)}
              </div>
              <p className="text-sm text-gray-600">
                {reviewCount.toLocaleString()} reviews
              </p>
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
                      width: `${
                        (ratingDistribution[stars] / reviews.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {ratingDistribution[stars]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share your experience
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
            Write a Review
          </button>
        </div>
      </div>

      {/* Filter Controls */}
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
        </div>

        <p className="text-sm text-gray-600">
          {filteredReviews.length} of {reviews.length} reviews
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200  last:border-b-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {review.username}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Verified Purchase
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {getRandomDate().toDateString()}
                  </span>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
