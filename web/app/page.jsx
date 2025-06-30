/**
 * Main Home Page Component
 * Displays the main e-commerce homepage with header, hero section, product grids, and footer
 */
import Header from "../components/Layout/Header/Header"
import HeroSection from "../components/Home/HeroSection/HeroSection"
import ProductGrid from "../components/Home/ProductGrid/ProductGrid"
import Footer from "../components/Layout/Footer/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main>
        {/* Hero Banner Section */}
        <HeroSection />

        {/* Featured Products Grid */}
        <ProductGrid />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  )
}
