import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { authUser } from "@/lib/middleware";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId)
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    return NextResponse.json({ success: true, message: "Added to favorites" });
  } catch (error) {
    console.error("Add to favorites failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
