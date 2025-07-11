"use client";

import { useState, useEffect } from "react";
import { Star, ChevronDown, Pencil, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // adjust path if needed

function getRandomDate() {
  const start = new Date("2024-01-01");
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default function ProductReviews({ product }) {
  const { user } = useAuth();
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showAll, setShowAll] = useState(false);
  const [visibleCount] = useState(3);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [newReview, setNewReview] = useState({
    username: "",
    title: "",
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    if (user) {
      setNewReview((prev) => ({
        ...prev,
        username: user.name || user.email,
      }));
    }
  }, [user]);

  const renderStars = (rating, clickable = false, onClick = () => {}) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        onClick={() => clickable && onClick(i)}
        className={`w-5 h-5 cursor-pointer ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      dist[r.rating]++;
    });
    return dist;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (i) => {
    setNewReview((prev) => ({ ...prev, rating: i + 1 }));
  };

  const submitReview = () => {
    if (!newReview.title || !newReview.comment || !newReview.rating) {
      alert("Please fill all fields.");
      return;
    }

    if (editingReviewId) {
      setReviews((prev) =>
        prev.map((r) =>
          r._id === editingReviewId ? { ...r, ...newReview } : r
        )
      );
      setEditingReviewId(null);
    } else {
      const newEntry = {
        ...newReview,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setReviews((prev) => [newEntry, ...prev]);
    }

    setNewReview({
      username: user?.name || "",
      title: "",
      comment: "",
      rating: 0,
    });
  };

  const editReview = (review) => {
    setNewReview({ ...review });
    setEditingReviewId(review._id);
  };

  const deleteReview = (id) => {
    if (confirm("Are you sure?")) {
      setReviews((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest", label: "Highest Rating" },
    { value: "lowest", label: "Lowest Rating" },
  ];

  const filterOptions = [
    { value: "all", label: "All Reviews" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  const filteredReviews = reviews.filter((r) =>
    filterBy === "all" ? true : r.rating === parseInt(filterBy)
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  const visibleReviews = showAll
    ? sortedReviews
    : sortedReviews.slice(0, visibleCount);

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl font-bold">{product.averageRating}</div>
            <div>
              <div className="flex items-center">
                {renderStars(product.averageRating)}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} reviews</p>
            </div>
          </div>

          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-2">
              <span className="w-6 text-sm text-gray-600">{stars}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{
                    width: `${
                      (ratingDistribution[stars] / reviews.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="w-8 text-sm text-gray-600">
                {ratingDistribution[stars]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-4">Share your experience</h3>
          {user ? (
            <button
              onClick={() => setEditingReviewId(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              {editingReviewId ? "Cancel" : "Write a Review"}
            </button>
          ) : (
            <p className="text-sm text-red-500">
              You must be logged in to write a review.
            </p>
          )}
        </div>
      </div>

      {/* Review Form */}
      {user && (
        <div className="border p-4 rounded-lg mb-6 bg-gray-50">
          <h4 className="text-lg font-semibold mb-4">
            {editingReviewId ? "Edit Review" : "Write a Review"}
          </h4>
          <input
            name="title"
            placeholder="Title"
            value={newReview.title}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 w-full mb-2"
          />
          <textarea
            name="comment"
            placeholder="Comment"
            value={newReview.comment}
            onChange={handleInputChange}
            className="border rounded-lg px-4 py-2 w-full mb-2"
            rows={4}
          />
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-gray-700">Your Rating:</span>
            {renderStars(newReview.rating, true, handleStarClick)}
          </div>
          <button
            onClick={submitReview}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 border-b pb-4">
        <div className="flex gap-3">
          <select
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
              setShowAll(false);
            }}
            className="border rounded-lg px-4 py-2"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600">
          {visibleReviews.length} of {sortedReviews.length} reviews
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {visibleReviews.map((review, index) => (
          <div
            key={review._id || `${review.username}-${index}`}
            className="border-b pb-6"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{review.username}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                    Verified
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {renderStars(review.rating)}
                  <span>
                    {new Date(
                      review.createdAt || getRandomDate()
                    ).toDateString()}
                  </span>
                </div>
              </div>
              {user?.name === review.username && (
                <div className="flex gap-2">
                  <button
                    onClick={() => editReview(review)}
                    className="text-blue-500 hover:underline text-sm flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="text-red-500 hover:underline text-sm flex items-center gap-1"
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">{review.title}</h4>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More / Less */}
      {sortedReviews.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 font-medium hover:underline"
          >
            {showAll ? "Show Less" : "Load More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
