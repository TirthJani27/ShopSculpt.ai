/**
 * Product Detail Page
 * Displays detailed product information, images, pricing, and related products
 * This file doesnt fatch data it only displays product from given function.
 */


"use client"

import Link from "next/link"
import Header from "../../../components/Layout/Header/Header"
import Footer from "../../../components/Layout/Footer/Footer"
import ProductImageGallery from "../../../components/Product/ProductImageGallery/ProductImageGallery"
import ProductInfo from "../../../components/Product/ProductInfo/ProductInfo"
import ProductReviews from "../../../components/Product/ProductReviews/ProductReviews"
import RelatedProducts from "../../../components/Product/RelatedProducts/RelatedProducts"
import { ArrowLeft } from "lucide-react"

export default function ProductPage({ params }) {
  // Mock product data - in real app, this would come from API
  const product = {
    id: params.id,
    name: "Modern Platform Bed Frame with Headboard",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 1234,
    inStock: true,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    description:
      "Transform your bedroom with this sleek and modern platform bed frame. Features a stylish upholstered headboard and sturdy construction.",
    features: [
      "Solid wood construction",
      "Easy assembly",
      "No box spring required",
      "Weight capacity: 500 lbs",
      "Available in multiple sizes",
    ],
    specifications: {
      Material: "Solid Wood",
      Color: "Natural Oak",
      Dimensions: '60" W x 80" L x 45" H',
      Weight: "85 lbs",
      "Assembly Required": "Yes",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories/furniture" className="hover:text-blue-600">
            Furniture
          </Link>
          <span>/</span>
          <Link href="/categories/bedroom" className="hover:text-blue-600">
            Bedroom
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button - Mobile */}
        <button className="md:hidden flex items-center space-x-2 text-blue-600 mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to results</span>
        </button>

        {/* Product Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images - Left Column */}
          <div className="lg:col-span-1">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Information - Middle Column */}
          <div className="lg:col-span-1">
            <ProductInfo product={product} />
          </div>

          {/* Purchase Options - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">{product.discount}% off</span>
                  </div>
                  <p className="text-green-600 text-sm font-medium">
                    You save ${(product.originalPrice - product.price).toFixed(2)}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-green-600 font-medium mb-2">✓ In Stock</p>
                  <p className="text-sm text-gray-600 mb-4">Free shipping on orders over $35</p>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                      Add to Cart
                    </button>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-6 rounded-lg font-medium transition-colors">
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

        {/* Product Reviews Section */}
        <div className="mt-12">
          <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>

      <Footer />
    </div>
  )
}


