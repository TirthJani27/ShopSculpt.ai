import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your routes
import registerRoute from "./app/api/auth/register/route";
import loginRoute from "./app/api/auth/login/route";
import profileRoute from "./app/api/user/profile/route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Register routes
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", profileRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});