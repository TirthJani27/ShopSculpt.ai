import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/models/cart.model";
import { authUser } from "@/lib/middleware";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const cartItem = await Cart.findById(id);
    if (!cartItem)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    if (!cartItem.userId.equals(user._id))
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await Cart.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /cart/:id error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectDB();
    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { quantity } = await req.json();
    if (!quantity || typeof quantity !== "number" || quantity < 1)
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });

    const item = await Cart.findOne({ productId: id, userId: user._id });
    if (!item)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    if (!item.userId.equals(user._id))
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    item.quantity = quantity;
    await item.save();
    await item.populate("productId");

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("PATCH /cart/:id error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
