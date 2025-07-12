import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart.model";
import { authUser } from "@/lib/middleware";

// Get all cart items for the current user
export async function GET(req: NextRequest) {
  await dbConnect();
  const { isAuthorized, user } = await authUser(req);
  if (!isAuthorized || !user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await Cart.find({ userId: user._id });

  return NextResponse.json({ success: true, items });
}
