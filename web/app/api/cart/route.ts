import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { Cart } from "@/models/Cart";
import jwt from "jsonwebtoken";

// Get all cart items for the current user
export async function GET(req: NextRequest) {
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

  const items = await Cart.find({ userId: decoded.id });

  return NextResponse.json({ success: true, items });
}
