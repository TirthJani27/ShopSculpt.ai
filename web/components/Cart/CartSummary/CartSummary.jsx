"use client";

import Link from "next/link";
import { Shield, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartSummary({
  subtotal,
  discount,
  platformFee,
  securedPackagingFee,
  total,
  itemCount,
  clearCart,
}) {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/cart", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setCart(data.items);
      } else {
        console.error("Failed to load cart from DB");
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required!");

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }

    const res = await fetch("/api/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        cartItems: cart,
        extraCharges: {
          discount,
          platformFee,
          securedPackagingFee,
        },
      }),
    });

    const data = await res.json();
    const order = data.order;
    if (!order) return alert("Failed to create order");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ShopSculpt",
      description: "Cart Checkout",
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            cartItems: cart,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("Payment Successful!");
          router.push("/success");
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        email: "customer@example.com",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    clearCart();
  };

  return (
    <div className="bg-white rounded-lg border p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        PRICE DETAILS
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Price ({itemCount} items)</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600 font-medium">
            -₹{discount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee</span>
          <span className="font-medium">₹{platformFee}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Secured Packaging Fee</span>
          <span className="font-medium">₹{securedPackagingFee}</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>
              ₹
              {(
                subtotal +
                platformFee +
                securedPackagingFee -
                discount
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="text-green-600 font-medium">
          You will save ₹{discount.toLocaleString()} on this order
        </div>
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium text-center block transition-colors"
      >
        PLACE ORDER
      </button>

      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
        <Truck className="w-4 h-4" />
        <span>Free delivery on orders above ₹99</span>
      </div>
    </div>
  );
}
