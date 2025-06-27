import ProductCard from "../ProductCard/ProductCard"

export default function CategorySection({ category }) {
  const { title, subtitle, products, bgColor } = category

  return (
    <section className={`${bgColor} rounded-lg p-6 mb-8`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium">Shop all →</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
