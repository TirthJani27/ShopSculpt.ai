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
    const fullUser = await User.findById(user._id);
    if (!fullUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (fullUser.favorites.includes(productId)) {
      fullUser.favorites = fullUser.favorites.filter(
        (favId: string) => favId !== productId
      );
      await fullUser.save();
    }
    return NextResponse.json({
      success: true,
      message: "Removed from favorites",
    });
  } catch (error) {
    console.error("Remove favorites failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
