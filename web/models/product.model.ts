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
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    category: { type: String },
    images: { type: [String], required: true },
    arrival_dates: { type: Number, default: 3 },
    persona: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);