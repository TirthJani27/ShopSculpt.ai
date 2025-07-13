import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review.model";
import Product from "@/models/product.model";
import { authUser } from "@/lib/middleware";

async function updateProductStats(productId: string) {
  const reviews = await Review.find({ productId });

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  await Product.findByIdAndUpdate(productId, {
    totalReviews,
    averageRating: averageRating.toFixed(1),
  });
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { isAuthorized, user } = await authUser(req);
    const { productId, rating, comment } = await req.json();

    if (!isAuthorized || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const username = user.fullname.firstname + " " + user.fullname.lastname;
    if (!productId || !username || typeof rating !== "number" || !comment)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await Review.create({
      productId,
      username,
      rating,
      comment,
      userId: user._id,
    });
    await updateProductStats(productId);
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Review creation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const reviewId = url.searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json({ error: "Missing reviewId" }, { status: 400 });
    }

    const deleted = await Review.findByIdAndDelete(reviewId);

    if (!deleted) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await updateProductStats(deleted.productId);

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Deleting review failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
