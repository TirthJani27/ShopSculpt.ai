"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { create } from "zustand";
import axios from "axios";

import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import ProductImageGallery from "../../../components/Product/ProductImageGallery/ProductImageGallery";
import ProductInfo from "../../../components/Product/ProductInfo/ProductInfo";
import ProductReviews from "../../../components/Product/ProductReviews/ProductReviews";
import RelatedProducts from "../../../components/Product/RelatedProducts/RelatedProducts";
import { ArrowLeft } from "lucide-react";

function discounted(product) {
  const originalPrice = product.price;
  const discountedPrice = (originalPrice * product.discount) / 100;
  const price = originalPrice - discountedPrice;
  product.originalPrice = originalPrice;
  product.price = price;
  product.savedAmount = discountedPrice;
}

function averageRatings(product) {
  let temp = 0;
  for (let i = 0; i < product.reviews.length; i++) {
    temp += product.reviews[i].rating;
  }
  temp = temp / product.reviews.length;
  product.averageRating = temp;
  product.reviewCount = product.reviews.length;
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/${id}`);
        const res2 = await axios.get(`http://localhost:3000/api/reviews/${id}`);
        console.log(res2.data.reviews);

        const prod = {
          id,
          ...res.data.product,
          reviews: res2.data.reviews,
        };

        discounted(prod);
        averageRatings(prod);

        setProduct(prod);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (!product)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #3498db",
            borderRadius: "75%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button className="md:hidden flex items-center space-x-2 text-blue-600 mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to results</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          <div className="lg:col-span-1">
            <ProductInfo product={product} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      {product.discount}% off
                    </span>
                  </div>
                  <p className="text-green-600 text-sm font-medium">
                    You save ₹{product.savedAmount.toFixed(2)}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-green-600 font-medium mb-2">✓ In Stock</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Free shipping on orders over ₹350
                  </p>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                      Add to Cart
                    </button>
                    <button
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        if (!token) return alert("Login required!");

                        if (!window.Razorpay) {
                          const script = document.createElement("script");
                          script.src =
                            "https://checkout.razorpay.com/v1/checkout.js";
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
                              cartItems: [
                                {
                                  id: product._id,
                                  name: product.name,
                                  price: product.price,
                                  quantity: 1,
                                },
                              ],
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
                            description: "Buy Now - Instant Checkout",
                            order_id: order.id,
                            handler: async function (response) {
                              const verifyRes = await fetch(
                                "/api/payment/verify",
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `${token}`,
                                  },
                                  body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id:
                                      response.razorpay_payment_id,
                                    razorpay_signature:
                                      response.razorpay_signature,
                                    cartItems: [
                                      {
                                        id: product._id,
                                        name: product.name,
                                        price: product.price,
                                        quantity: 1,
                                      },
                                    ],
                                  }),
                                }
                              );

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
                      }}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-6 rounded-lg font-medium transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4 text-sm text-gray-600">
                  <div className="flex justify-between py-1">
                    <span>Delivery:</span>
                    <span className="font-medium">2-3 business days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Pickup:</span>
                    <span className="font-medium">Available today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ProductReviews
            product={product}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <div className="mt-12">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}