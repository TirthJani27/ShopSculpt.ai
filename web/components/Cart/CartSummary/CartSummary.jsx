/**
 * Cart Summary Component
 * Displays pricing breakdown and checkout button
 * Sticky positioning on desktop for better UX
 */
"use client"
import Link from "next/link"
import { Shield, Truck } from "lucide-react"

export default function CartSummary({ subtotal, discount, platformFee, securedPackagingFee, total, itemCount }) {
  return (
    <div className="bg-white rounded-lg border p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">PRICE DETAILS</h3>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Price ({itemCount} items)</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600 font-medium">−₹{discount.toLocaleString()}</span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee</span>
          <span className="font-medium">₹{platformFee}</span>
        </div>

        {/* Secured Packaging Fee */}
        <div className="flex justify-between">
          <span className="text-gray-600">Secured Packaging Fee</span>
          <span className="font-medium">₹{securedPackagingFee}</span>
        </div>

        {/* Divider */}
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Savings */}
        <div className="text-green-600 font-medium">You will save ₹{discount.toLocaleString()} on this order</div>
      </div>

      {/* Security Info */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium text-center block transition-colors"
      >
        PLACE ORDER
      </Link>

      {/* Free Delivery Info */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
        <Truck className="w-4 h-4" />
        <span>Free delivery on orders above ₹499</span>
      </div>
    </div>
  )
}
