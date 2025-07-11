import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/review.model";
import { authUser } from "@/lib/middleware";

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

    const review = await Review.create({
      productId,
      username,
      rating,
      comment,
      userId: user._id,
    });
    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Review creation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
