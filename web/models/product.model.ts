import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  review: String,
  starRating: { type: Number, min: 1, max: 5 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    imagesUrl: [String],
    description: String,
    priceRating: { type: Number, min: 1, max: 5 },
    feedback: [feedbackSchema],
    arrival: { type: Number, default: 3 }, // Number of days for arrival
    categories: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
