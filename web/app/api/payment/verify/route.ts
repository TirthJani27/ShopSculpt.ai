import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { authUser } from "@/lib/middleware";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/transaction.model";
import Product from "@/models/product.model";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { isAuthorized, user } = await authUser(req);
  if (!isAuthorized || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    cartItems,
    extraCharges,
  } = body;

  const { discount = 0, platformFee = 0, securedPackagingFee = 0 } = extraCharges || {};

  const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(bodyString)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  let itemTotal = 0;
  const items = [];

  for (const item of cartItems) {
    const product = await Product.findById(item.productId || item.id);
    if (!product) continue;

    const price = product.price;
    const quantity = item.quantity;

    itemTotal += price * quantity;

    items.push({
      productId: product._id,
      quantity,
      priceAtPurchase: price,
    });
  }

  const total = itemTotal + platformFee + securedPackagingFee - discount;

  const transaction = await Transaction.create({
    userId: user._id,
    email: user.email,
    items,
    totalAmount: total,
    razorpay: {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
    },
  });

  return NextResponse.json({ success: true, transaction });
}
