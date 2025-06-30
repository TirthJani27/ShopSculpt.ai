import { Search, ShoppingCart, User, MapPin, Heart } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      {/* Top bar */}
      <div className="bg-blue-700 py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <span>How do you want your items?</span>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Sacramento, 95829</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Sign In</span>
            <span>Account</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-8">Walmart</div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search everything at Walmart online and in store"
                className="w-full py-3 px-4 pr-12 rounded-full text-black border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full">
                <Search className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-blue-500 p-2 rounded">
              <Heart className="w-6 h-6" />
              <span className="hidden md:block">Reorder</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-blue-500 p-2 rounded">
              <User className="w-6 h-6" />
              <span className="hidden md:block">Sign In</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:bg-blue-500 p-2 rounded relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="hidden md:block">$0.00</span>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-blue-600 border-t border-blue-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-2 text-sm">
            <span className="cursor-pointer hover:underline">Departments</span>
            <span className="cursor-pointer hover:underline">Services</span>
            <span className="cursor-pointer hover:underline">Grocery & essentials</span>
            <span className="cursor-pointer hover:underline">Electronics</span>
            <span className="cursor-pointer hover:underline">Furniture</span>
            <span className="cursor-pointer hover:underline">Fashion</span>
            <span className="cursor-pointer hover:underline">Auto & tires</span>
            <span className="cursor-pointer hover:underline">Pharmacy</span>
          </div>
        </div>
      </nav>
    </header>
  )
}
