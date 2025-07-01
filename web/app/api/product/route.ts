import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "Name query is required" },
        { status: 400 }
      );
    }

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Product search failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
