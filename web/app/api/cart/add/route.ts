import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { Cart } from "@/models/Cart";
import jwt from "jsonwebtoken";

// Add product to user's cart
export async function POST(req: NextRequest) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  console.log("Authorization Header:", authHeader);

  const token = authHeader?.replace("Bearer ", "").trim();
  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("Decoded:", decoded);
  } catch (err) {
    console.error("JWT Error:", err);
    return NextResponse.json({ error: "Invalid or malformed token" }, { status: 401 });
  }

  const data = await req.json();

  const existing = await Cart.findOne({
    userId: decoded.id,
    productId: data.productId,
  });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return NextResponse.json({ success: true, item: existing });
  }

  const newItem = await Cart.create({ ...data, userId: decoded.id });

  return NextResponse.json({ success: true, item: newItem });
}
