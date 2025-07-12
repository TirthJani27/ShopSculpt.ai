
"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function HeroSection() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 200) 
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {loading ? (
            <div className="bg-white rounded-2xl p-6 border h-full animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            <Link href="/categories/electronics" className="block">
              <div className="bg-white rounded-2xl p-6 border transition h-full hover:shadow-[0_6px_24px_rgba(0,0,255,0.3)]">
                <img src="/tech.png" alt="Electronics" className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg mb-1">Electronics</h3>
                <p className="text-sm text-gray-600">20% off tech accessories</p>
              </div>
            </Link>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl p-6 border h-full animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            <Link href="/categories/beauty" className="block">
              <div className="bg-white rounded-2xl p-6 border transition h-full hover:shadow-[0_6px_24px_rgba(0,0,255,0.3)]">
                <img src="/beauty.png" alt="Beauty" className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg mb-1">Cosmetics</h3>
                <p className="text-sm text-gray-600">Beauty must-haves</p>
              </div>
            </Link>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl p-6 border h-full animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            <Link href="/categories/furniture" className="block">
              <div className="bg-white rounded-2xl p-6 border transition h-full hover:shadow-[0_6px_24px_rgba(0,0,255,0.3)]">
                <img src="/furniture.png" alt="Home & Kitchen" className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg mb-1">Home Decor</h3>
                <p className="text-sm text-gray-600">Upgrade your space</p>
              </div>
            </Link>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl p-6 border h-full animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            <Link href="/categories/sports" className="block">
              <div className="bg-white rounded-2xl p-6 border transition h-full hover:shadow-[0_6px_24px_rgba(0,0,255,0.3)]">
                <img src="/sports.png" alt="Sports & Fitness" className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg mb-1">Sports & Fitness</h3>
                <p className="text-sm text-gray-600">Gear up and save</p>
              </div>
            </Link>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl p-6 border h-full animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            <Link href="/categories/grocery" className="block">
              <div className="bg-white rounded-2xl p-6 border transition h-full hover:shadow-[0_6px_24px_rgba(0,0,255,0.3)]">
                <img src="/grocerry.png" alt="Groceries" className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg mb-1">Groceries</h3>
                <p className="text-sm text-gray-600">Instant Delivery</p>
              </div>
            </Link>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl p-6 border h-full animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ) : (
            <Link href="/categories/fashion" className="block">
              <div className="bg-white rounded-2xl p-6 border transition h-full hover:shadow-[0_6px_24px_rgba(0,0,255,0.3)]">
                <img src="/clothing.png" alt="Clothing & Accessories" className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg mb-1">Clothing & Accessories</h3>
                <p className="text-sm text-gray-600">Trendy & affordable</p>
              </div>
            </Link>
          )}

        </div>
      </div>
    </section>
  )
}
