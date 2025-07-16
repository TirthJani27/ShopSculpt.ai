import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  try {
    await dbConnect();

    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(5);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Product search failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


