import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Product from "@/models/product.model";

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find().limit(6);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
