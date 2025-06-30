import ProductCard from "../../ProductCard/ProductCard"
import CategorySection from "../../CategorySection/CategorySection"

export default function ProductGrid() {
  const featuredProducts = [
    {
      id: 1,
      title: "Apple iPhone 14 Pro",
      price: 1099.0,
      originalPrice: 1199.0,
      rating: 4.5,
      reviews: 1234,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Rollback",
    },
    {
      id: 2,
      title: 'Samsung 65" 4K TV',
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.3,
      reviews: 856,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Save $200",
    },
    {
      id: 3,
      title: "Nike Air Max 270",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.7,
      reviews: 2341,
      image: "/placeholder.svg?height=200&width=200",
      badge: "30% off",
    },
    {
      id: 4,
      title: "KitchenAid Stand Mixer",
      price: 279.99,
      originalPrice: 349.99,
      rating: 4.8,
      reviews: 1876,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Best Seller",
    },
    {
      id: 5,
      title: "Dyson V15 Vacuum",
      price: 449.99,
      originalPrice: 549.99,
      rating: 4.6,
      reviews: 967,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Save $100",
    },
    {
      id: 6,
      title: "PlayStation 5 Console",
      price: 499.99,
      rating: 4.9,
      reviews: 3421,
      image: "/placeholder.svg?height=200&width=200",
      badge: "In Stock",
    },
  ]

  const categories = [
    {
      title: "Skechers up to 30% off",
      subtitle: "Shop athletic shoes",
      products: featuredProducts.slice(0, 4),
      bgColor: "bg-blue-50",
    },
    {
      title: "Home essentials",
      subtitle: "Upgrade your space",
      products: featuredProducts.slice(2, 6),
      bgColor: "bg-gray-50",
    },
    {
      title: "Electronics deals",
      subtitle: "Tech for less",
      products: featuredProducts.slice(1, 5),
      bgColor: "bg-green-50",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <CategorySection key={index} category={category} />
      ))}

      {/* Additional product grids */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">More great deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...featuredProducts, ...featuredProducts.slice(0, 6)].map((product, index) => (
            <ProductCard key={`more-${index}`} product={{ ...product, id: `more-${index}` }} />
          ))}
        </div>
      </section>
    </div>
  )
}
