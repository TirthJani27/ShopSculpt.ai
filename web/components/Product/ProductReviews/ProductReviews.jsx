"use client";

import { useState, useEffect } from "react";
import { Star, Pencil, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

function getRandomDate() {
  const start = new Date("2024-01-01");
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default function ProductReviews({ product }) {
  const { user } = useAuth();
  const [toastMessage, setToastMessage] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showAll, setShowAll] = useState(false);
  const [reviewPannel, setReviewPannel] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [visibleCount] = useState(3);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [newReview, setNewReview] = useState({
    username: "",
    productId: product._id,
    comment: "",
    rating: 1,
  });

  useEffect(() => {
    if (user) {
      setNewReview((prev) => ({
        ...prev,
        username:
          user.fullname.firstname + " " + user.fullname.lastname || user.email,
      }));
    }
  }, [user]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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

  const deleteReview = async (reviewId) => {
    try {
      const res = await axios.delete("/api/reviews", {
        params: { reviewId },
      });

      if (res.status === 200) {
        // Update the local reviews state by filtering out the deleted one
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );

        console.log("Review deleted successfully");
        showToastMessage("Review deleted successfully");
      } else {
        console.warn("Unexpected response while deleting review:", res);
      }
    } catch (err) {
      console.log("Error deleting review:", err?.response?.data || err.message);
      showToastMessage("Failed to delete review. Try again.");
    }
  };

  const submitReview = async () => {
    // Basic validation
    if (!newReview.comment.trim() || newReview.rating <= 0) {
      console.warn("Please provide both a comment and a rating.");
      showToastMessage("Please provide both a comment and a rating.");
      return;
    }

    try {
      const res = await axios.post("/api/reviews", newReview, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 201 || res.status === 200) {
        showToastMessage("Review submitted successfully.");
        setReviews(res.data.reviews);
        setNewReview({
          productId: product._id,
          comment: "",
          rating: 0,
        });
        setReviewPannel(false);
        // Optional: refetch or update review list
        // onSuccess?.();
      } else {
        console.warn("Unexpected response:", res);
        showToastMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(
        "Error submitting review:",
        error?.response?.data || error.message
      );
      showToastMessage("Failed to submit review. Please try again later.");
    }
  };

  const sortOptions = [
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
    <>
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
                <p className="text-sm text-gray-600">
                  {reviews.length} reviews
                </p>
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
            <h3 className="text-lg font-semibold mb-4">
              Share your experience
            </h3>
            {user ? (
              <button
                onClick={() => {
                  setEditingReviewId(null);
                  setReviewPannel(!reviewPannel);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                {reviewPannel ? "Cancel" : "Write a Review"}
              </button>
            ) : (
              <p className="text-sm text-red-500">
                You must be logged in to write a review.
              </p>
            )}
          </div>
        </div>

        {/* Review Form */}
        {user && reviewPannel && (
          <div className="border p-4 rounded-lg mb-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-4">
              {editingReviewId ? "Edit Review" : "Write a Review"}
            </h4>

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
          {visibleReviews.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No reviews yet. Be the first to write one!
            </p>
          ) : (
            visibleReviews.map((review, index) => (
              <div
                key={review._id || `${review.username}-${index}`}
                className="border-b pb-6"
              >
                <div className="flex justify-between items-start mb-2">
                  {/* Reviewer Info */}
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-800">
                        {review.username}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      {review.rating ? (
                        <>
                          {renderStars(review.rating)}
                          <span className="text-xs">
                            {new Intl.DateTimeFormat("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }).format(
                              new Date(review.createdAt || getRandomDate())
                            )}
                          </span>
                        </>
                      ) : (
                        <span className="italic text-xs text-gray-400">
                          No rating
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete Option */}
                  {user?._id === review.userId && (
                    <button
                      onClick={() => deleteReview(review._id)}
                      aria-label="Delete review"
                      className="text-red-500 hover:underline text-sm flex items-center gap-1"
                    >
                      <Trash className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {review.comment}
                </h4>
              </div>
            ))
          )}
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
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </>
  );
}
