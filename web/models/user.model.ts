import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  keyword: String,
  searchedAt: { type: Date, default: Date.now },
});

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    totalSpending: { type: Number, default: 0 },
    password: { type: String, required: true },
    fullname: {
      firstname: { type: String, required: true },
      lastname: { type: String },
    },
    age: { type: Number, default: 10 },
    dob: { type: Date },
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
    address: addressSchema,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
