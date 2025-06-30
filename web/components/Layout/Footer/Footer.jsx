import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About ShopSculpt
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Suppliers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Sell on ShopSculpt
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Self-Publish with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4">ShopSculpt Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  ShopSculpt Credit Card
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  ShopSculpt Pay
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop with Points
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Rates & Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Replacements
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media and bottom section */}
        <div className="border-t border-blue-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-2xl font-bold">ShopSculpt</span>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-300" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-300" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-300" />
                <Youtube className="w-5 h-5 cursor-pointer hover:text-blue-300" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <span>© 2024 ShopSculpt Inc. All Rights Reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="hover:underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
