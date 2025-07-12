import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/models/cart.model";
import { authUser } from "@/lib/middleware";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, quantity = 1 } = await req.json();
    if (!productId)
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });

    const existing = await Cart.findOne({ userId: user._id, productId });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      await existing.populate("productId");
      return NextResponse.json({ success: true, item: existing });
    }

    const newItem = await Cart.create({
      userId: user._id,
      productId,
      quantity,
    });
    await newItem.populate("productId");

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("POST /cart error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
