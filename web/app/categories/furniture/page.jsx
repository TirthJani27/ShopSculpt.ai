"use client";
import { useEffect, useState } from "react";
import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import ProductCard from "../../../components/ProductCard/ProductCard";
import CategoryFilter from "../../../components/Category/CategoryFilter/CategoryFilter";
import { Search, Filter, Grid, List, ChevronDown, Home, Sofa, Bed } from "lucide-react";

export default function FurniturePage() {
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const res = await fetch("/api/product/category/Furniture");
        const data = await res.json();
        const transformed = data.map((p) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          originalPrice: p.discount
            ? p.price / (1 - p.discount / 100)
            : p.price,
          rating: p.reviews?.[0]?.rating || 4.5,
          reviews: p.reviews?.length || 0,
          image: p.images?.[0] || "/placeholder.svg",
          badge:
            p.discount >= 30
              ? "Hot Deal"
              : p.discount > 0
              ? `Save ${p.discount}%`
              : "New",
          category: p.category || "General",
          room: p.tags?.includes("Living Room") ? "living-room" :
                p.tags?.includes("Bedroom") ? "bedroom" :
                p.tags?.includes("Dining Room") ? "dining-room" :
                p.tags?.includes("Office") ? "office" :
                p.tags?.includes("Kids") ? "kids" :
                p.tags?.includes("Outdoor") ? "outdoor" :
                "other",
        }));
        setFurnitureProducts(transformed);
      } catch (err) {
        console.error("Failed to fetch furniture", err);
      }
    };
    fetchFurniture();
  }, []);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "New Arrivals" },
  ];

  const rooms = [
    { id: "all", name: "All Rooms", icon: Home },
    { id: "living-room", name: "Living Room", icon: Sofa },
    { id: "bedroom", name: "Bedroom", icon: Bed },
    { id: "dining-room", name: "Dining Room", icon: Home },
    { id: "office", name: "Office", icon: Home },
    { id: "kids", name: "Kids Room", icon: Home },
    { id: "outdoor", name: "Outdoor", icon: Home },
  ];

  const filtered = furnitureProducts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRoom = selectedRoom === "all" || p.room === selectedRoom;
    return matchSearch && matchRoom;
  });

  const categories = [
    { name: "All Furniture", count: furnitureProducts.length },
    ...Array.from(
      furnitureProducts.reduce((map, p) => {
        const cat = p.category || "Uncategorized";
        map.set(cat, (map.get(cat) || 0) + 1);
        return map;
      }, new Map())
    ).map(([name, count]) => ({ name, count })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span>
            <span className="text-gray-900">Furniture</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Furniture</h1>
          <p className="text-gray-600">Find the perfect furniture for your home</p>
        </div>

        {/* Room Filter Tabs */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Shop by Room</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {rooms.map((room) => {
              const Icon = room.icon;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                    selectedRoom === room.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">{room.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & View Options */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <CategoryFilter categories={categories} />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 text-gray-600">
              Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} results
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No furniture found</h3>
                <p className="text-gray-600">Try another room or different search term</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
                {filtered.slice(0, visibleCount).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {visibleCount < filtered.length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
