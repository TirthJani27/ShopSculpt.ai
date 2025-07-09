
import Link from "next/link"


export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main banner grid */}
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {/* Large banner */}
          <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Yes to savings on top-rated tech</h2>
              <p className="text-blue-100 mb-4">Shop now</p>
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          </div>

          {/* Smaller banners */}
          <Link href="/categories/electronics" className="">
          
          <div className="bg-white rounded-2xl p-4 border">
            <img
              src="/tech.png"
              alt="Product"
              className="w-full h-24 object-cover rounded-xl mb-2"
            />
            <h3 className="font-semibold text-sm">20% off tech accessories</h3>
            <p className="text-xs text-gray-600">Shop now</p>
          </div>
          </Link>

          <Link href="/categories/fashion" className="">
          <div className="bg-white rounded-2xl p-4 border">
            <img
              src="/beauty.png"
              alt="Product"
              className="w-full h-24 object-cover rounded-xl mb-2"
            />
            <h3 className="font-semibold text-sm">Beauty must-haves</h3>
            <p className="text-xs text-gray-600">Shop now</p>
          </div>
          </Link>
          </div>

        {/* Secondary banner row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-green-600 rounded-2xl p-4 text-white">
            <h3 className="font-bold text-sm mb-1">Free shipping, no order minimum</h3>
            <p className="text-xs">Sign up or sign in</p>
          </div>

          <div className="bg-red-500 rounded-2xl p-4 text-white">
            <h3 className="font-bold text-sm mb-1">Rollback</h3>
            <p className="text-xs">Great deals</p>
          </div>

          <div className="bg-yellow-400 rounded-2xl p-4 text-black">
            <h3 className="font-bold text-sm mb-1">Flash Deals</h3>
            <p className="text-xs">Limited time</p>
          </div>

          <div className="bg-purple-600 rounded-2xl p-4 text-white">
            <h3 className="font-bold text-sm mb-1">New arrivals</h3>
            <p className="text-xs">Check them out</p>
          </div>

          <div className="bg-orange-500 rounded-2xl p-4 text-white">
            <h3 className="font-bold text-sm mb-1">Clearance</h3>
            <p className="text-xs">Up to 50% off</p>
          </div>

          <div className="bg-teal-600 rounded-2xl p-4 text-white">
            <h3 className="font-bold text-sm mb-1">Home essentials</h3>
            <p className="text-xs">Shop now</p>
          </div>
        </div>
      </div>
    </section>
  )
}
