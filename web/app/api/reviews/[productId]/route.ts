import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review.model";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    await dbConnect();
    const { productId } = await params;

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Fetching reviews failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}