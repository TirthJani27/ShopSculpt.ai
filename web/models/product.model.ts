import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 0, max: 5, required: true },
  description: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
<<<<<<< refs/remotes/origin/backend-2
    imagesUrl: [String],
    description: String,
    priceRating: { type: Number, min: 1, max: 5 },
    feedback: [feedbackSchema],
    arrival: { type: Number, default: 3 }, // Number of days for arrival
    categories: [String],
=======
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    category: { type: String },
    images: { type: [String], required: true },
    arrival_dates: { type: Number, default: 3 },
    persona: { type: [String], required: true },
>>>>>>> local
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);