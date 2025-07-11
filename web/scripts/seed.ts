import dotenv from "dotenv";
dotenv.config();
import dbConnect from "../lib/dbConnect.js";
import Product from "../models/product.model.js";
import { products } from "./products.js";

async function seedDatabase() {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Dummy products inserted successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
