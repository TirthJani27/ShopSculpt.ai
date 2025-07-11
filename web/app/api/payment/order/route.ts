import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { authUser } from "@/lib/middleware";
import dbConnect from "@/lib/dbConnect";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  await dbConnect();

  const { isAuthorized, user } = await authUser(req);
  if (!isAuthorized || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { cartItems } = await req.json();

  const amount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}
