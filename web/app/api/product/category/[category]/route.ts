import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";

export async function GET(
  request: NextRequest,
  context: { params: { category: string } }
) {
  await dbConnect();

  const { category } = await context.params;

  try {
    const products = await Product.find({ category });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category products", details: error },
      { status: 500 }
    );
  }
}
