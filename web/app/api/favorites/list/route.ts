import dbConnect from "@/lib/dbConnect";
import { authUser } from "@/lib/middleware";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import Product from "@/models/product.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const fullUser = await User.findById(user._id)
      .populate({
        path: "favorites",
        model: Product,
      })
      .lean();
    if (!fullUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    
  } catch (error) {
    console.error("List to favorites failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
