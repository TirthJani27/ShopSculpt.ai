import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { Cart } from "@/models/Cart";
import jwt from "jsonwebtoken";

// DELETE cart item for the current user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const cartItem = await Cart.findById(params.id);

  if (!cartItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  if (cartItem.userId !== decoded.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await Cart.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}

// PATCH cart item (update quantity) for the current user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { quantity } = await req.json();

  if (!quantity || quantity < 1) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  const item = await Cart.findByIdAndUpdate(
    params.id,
    { quantity },
    { new: true }
  );

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, item });
}