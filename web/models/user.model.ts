import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  keyword: String,
  searchedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: {
      firstname: { type: String, required: true },
      lastname: { type: String },
    },
    age: Number,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "PreferNotToSay"],
    },
    region: String,
    interestCategory: [String],
    persona: [String], // Max 2 personas
    priceRange: {
      type: String,
      enum: ["Budget_Friendly", "Mid_Range", "Premium"],
    },
    shoppingFrequency: {
      type: String,
      enum: ["Rarely", "Monthly", "Weekly", "Daily"],
    },
    searchHistory: [searchHistorySchema],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    transactionHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
