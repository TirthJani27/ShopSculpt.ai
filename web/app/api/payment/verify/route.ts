import crypto from "crypto";
import { NextRequest, NextResponse } from 'next/server';
import { authUser } from "@/lib/middleware";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/transaction.model";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { isAuthorized, user } = await authUser(req);
  if (!isAuthorized || !user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems } = body;

  const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(bodyString)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const total = cartItems.reduce((sum: number, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);

  const transaction = await Transaction.create({
    userId: user._id,
    email: user.email,
    items: cartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
      priceAtPurchase: item.price,
    })),
    totalAmount: total,
    razorpay: {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
    },
  });

  return NextResponse.json({ success: true, transaction });
}
