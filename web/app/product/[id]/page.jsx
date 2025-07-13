"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import ProductImageGallery from "../../../components/Product/ProductImageGallery/ProductImageGallery";
import ProductInfo from "../../../components/Product/ProductInfo/ProductInfo";
import ProductReviews from "../../../components/Product/ProductReviews/ProductReviews";
import RelatedProducts from "../../../components/Product/RelatedProducts/RelatedProducts";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "../../../contexts/CartContext";

// Helpers
function applyDiscount(product) {
  const originalPrice = product.price;
  const discountAmount = (originalPrice * product.discount) / 100;
  const discountedPrice = originalPrice - discountAmount;

  product.originalPrice = originalPrice;
  product.price = Math.round(discountedPrice);
  product.savedAmount = Math.round(discountAmount);
}

function calculateAverageRating(product) {
  const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = total / product.reviews.length;
  product.averageRating = avg.toFixed(1);
  product.reviewCount = product.reviews.length;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/product/${id}`);
        const res2 = await axios.get(`/api/reviews/${id}`);

        const fullProduct = {
          id,
          ...res.data.product,
          reviews: res2.data.reviews,
        };

        applyDiscount(fullProduct);
        calculateAverageRating(fullProduct);
        setProduct(fullProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading || !product) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isInCart(product._id)) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button className="md:hidden flex items-center space-x-2 text-blue-600 mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to results</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <ProductInfo product={product} />
          </div>

          {/* Purchase Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24 space-y-4">
              {/* Pricing */}
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
                  You save ₹{product.savedAmount}
                </p>
              </div>

              {/* Availability */}
              <div className="border-t pt-4">
                <p className="text-green-600 font-medium mb-2">✓ In Stock</p>
                <p className="text-sm text-gray-600 mb-4">
                  Free shipping on orders over ₹350
                </p>

                {/* Add to Cart Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart(product._id)}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      isInCart(product._id)
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isInCart(product._id) ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Added to Cart
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-6 rounded-lg font-medium transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
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

        {/* Reviews */}
        <div className="mt-12">
          <ProductReviews
            product={product}
            rating={product.averageRating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Related */}
        <div className="mt-12">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
