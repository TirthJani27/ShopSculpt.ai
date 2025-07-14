"use client"
import { useState } from "react"
import Header from "../../components/Layout/Header/Header" // Correct path to Header
import Footer from "../../components/Layout/Footer/Footer" // Correct path to Footer
import {
  Camera,
  DollarSign,
  Car,
  Smartphone,
  Eye,
  Scissors,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Calendar,
} from "lucide-react"

// Sample product data (replace with actual data from an API or database)
const products = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra (Black, 256 GB)',
    price: '₹1,29,999',
    originalPrice: '₹1,34,999',
    rating: 4.5,
    reviews: 1234,
    imageUrl: 'https://placehold.co/150x150/E0E7FF/3F51B5?text=Product+1',
    description: '12 GB RAM | 256 GB ROM',
    offers: '1 year manufacturer warranty for device and 6 months manufacturer warranty for in the box accessories',
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro (Blue, 128 GB)',
    price: '₹1,19,999',
    originalPrice: '₹1,29,900',
    rating: 4.7,
    reviews: 987,
    imageUrl: 'https://placehold.co/150x150/E0E7FF/3F51B5?text=Product+2',
    description: '8 GB RAM | 128 GB ROM',
    offers: '1 year manufacturer warranty for device and 6 months manufacturer warranty for in the box accessories',
  },
  {
    id: 3,
    name: 'Google Pixel 8 Pro (Obsidian, 128 GB)',
    price: '₹89,999',
    originalPrice: '₹99,999',
    rating: 4.3,
    reviews: 567,
    imageUrl: 'https://placehold.co/150x150/E0E7FF/3F51B5?text=Product+3',
    offers: '1 year manufacturer warranty for device and 6 months manufacturer warranty for in the box accessories',
  },
  {
    id: 4,
    name: 'OnePlus 12 (Flowy Emerald, 256 GB)',
    price: '₹64,999',
    originalPrice: '₹69,999',
    rating: 4.6,
    reviews: 789,
    imageUrl: 'https://placehold.co/150x150/E0E7FF/3F51B5?text=Product+4',
    offers: '1 year manufacturer warranty for device and 6 months manufacturer warranty for in the box accessories',
  },
  {
    id: 5,
    name: 'Xiaomi 14 Ultra (White, 512 GB)',
    price: '₹99,999',
    originalPrice: '₹1,09,999',
    rating: 4.4,
    reviews: 321,
    imageUrl: 'https://placehold.co/150x150/E0E7FF/3F51B5?text=Product+5',
    offers: '1 year manufacturer warranty for device and 6 months manufacturer warranty for in the box accessories',
  },
];

// Product Card Component
const ProductCard = ({ product }) => (
  <div className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 w-full">
    {/* Product Image */}
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-32 h-32 object-contain rounded-md"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/E0E7FF/3F51B5?text=No+Image`; }}
      />
    </div>

    {/* Product Details */}
    <div className="flex-grow text-center md:text-left">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
      {product.description && <p className="text-sm text-gray-600 mb-2">{product.description}</p>}
      <div className="flex items-center justify-center md:justify-start mb-2">
        <span className="text-yellow-500 text-sm mr-1">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
        </span>
        <span className="text-gray-600 text-sm">({product.reviews})</span>
      </div>
      <p className="text-green-600 text-sm mb-2">{product.offers}</p>
    </div>

    {/* Price and Action */}
    <div className="flex-shrink-0 text-center md:text-right mt-4 md:mt-0">
      <div className="text-2xl font-bold text-gray-900 mb-1">{product.price}</div>
      {product.originalPrice && (
        <div className="text-sm text-gray-500 line-through mb-2">{product.originalPrice}</div>
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
        View Details
      </button>
    </div>
  </div>
);

// Filter Section Component
const FilterSection = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
    <div className="space-y-4">
      {/* Category Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Categories</h3>
        <ul className="space-y-1 text-gray-600 text-sm">
          <li><a href="#" className="hover:text-blue-600">Smartphones</a></li>
          <li><a href="#" className="hover:text-blue-600">Laptops</a></li>
          <li><a href="#" className="hover:text-blue-600">Tablets</a></li>
          <li><a href="#" className="hover:text-blue-600">Accessories</a></li>
        </ul>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Price Range</h3>
        <input type="range" min="0" max="200000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>₹0</span>
          <span>₹2,00,000+</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Brand</h3>
        <ul className="space-y-1 text-gray-600 text-sm">
          <li><input type="checkbox" className="mr-2" />Samsung</li>
          <li><input type="checkbox" className="mr-2" />Apple</li>
          <li><input type="checkbox" className="mr-2" />Google</li>
          <li><input type="checkbox" className="mr-2" />OnePlus</li>
          <li><input type="checkbox" className="mr-2" />Xiaomi</li>
        </ul>
      </div>

      {/* Customer Ratings Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Customer Ratings</h3>
        <ul className="space-y-1 text-gray-600 text-sm">
          <li><input type="radio" name="rating" className="mr-2" />4★ & above</li>
          <li><input type="radio" name="rating" className="mr-2" />3★ & above</li>
        </ul>
      </div>
    </div>
  </div>
);

// Main App Component
const ProductList = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="container mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4">
          <FilterSection />
        </aside>

        {/* Product Listing */}
        <section className="w-full lg:w-3/4">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800">Mobile Phones</h2>
            <p className="text-gray-600 text-sm">Showing 1 - {products.length} of {products.length} results</p>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductList;