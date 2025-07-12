"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function PaymentPage() {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required!");

    const res = await fetch("/api/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartItems: cart }),
    });

    const data = await res.json();
    const order = data.order;

    if (!window.Razorpay || !order) return alert("Payment initiation failed");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ShopSculpt",
      description: "Order Payment",
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
          clearCart();
          router.push("/success");
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        email: "customer@example.com",
        contact:'9999999999',
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
