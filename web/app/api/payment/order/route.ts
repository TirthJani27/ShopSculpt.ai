import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { authUser } from "@/lib/middleware";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
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

  const { cartItems, extraCharges } = await req.json();
  const { discount = 0, platformFee = 0, securedPackagingFee = 0 } = extraCharges || {};

  // console.log("Product Card(s) Received:", cartItems);

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json(
      { message: "Cart is empty. Cannot process payment." },
      { status: 400 }
    );
  }

  let itemTotal = 0;

  for (const item of cartItems) {
    const product = await Product.findById(item.productId);
    if (!product) continue;

    itemTotal += product.price * item.quantity;
  }

  let amount = itemTotal + platformFee + securedPackagingFee - discount;

  if (amount < 1) {
    return NextResponse.json(
      { message: "Amount must be at least ₹1 to proceed with payment." },
      { status: 400 }
    );
  }

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
