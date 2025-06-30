import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    image: String,
  },
  { timestamps: true }
);

export const Cart =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema);
