/**
 * Services Page
 * Displays Walmart services like photo printing, money services, auto care
 */
"use client"
import { useState } from "react"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"
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

export default function ServicesPage() {
  const [selectedLocation, setSelectedLocation] = useState("Sacramento, CA")

  // Mock services data
  const services = [
    {
      id: "photo",
      name: "Photo Services",
      description: "Print photos, create photo books, and custom gifts",
      icon: Camera,
      color: "bg-purple-500",
      features: ["Same-day pickup", "Custom photo books", "Canvas prints", "Passport photos"],
      price: "Starting at $0.09/photo",
      rating: 4.8,
      reviews: 1234,
    },
    {
      id: "money",
      name: "Money Services",
      description: "Money transfers, check cashing, and bill pay",
      icon: DollarSign,
      color: "bg-green-500",
      features: ["Money transfers", "Check cashing", "Bill payments", "Money orders"],
      price: "Low fees starting at $1",
      rating: 4.6,
      reviews: 2156,
    },
    {
      id: "auto",
      name: "Auto Care Center",
      description: "Oil changes, tire installation, and auto maintenance",
      icon: Car,
      color: "bg-blue-500",
      features: ["Oil changes", "Tire installation", "Battery service", "Auto maintenance"],
      price: "Oil change from $29.88",
      rating: 4.5,
      reviews: 892,
    },
    {
      id: "tech",
      name: "Tech Services",
      description: "Device setup, repair, and tech support",
      icon: Smartphone,
      color: "bg-orange-500",
      features: ["Phone repair", "Device setup", "Data transfer", "Tech support"],
      price: "Screen repair from $79",
      rating: 4.4,
      reviews: 567,
    },
    {
      id: "vision",
      name: "Vision Center",
      description: "Eye exams, glasses, and contact lenses",
      icon: Eye,
      color: "bg-teal-500",
      features: ["Eye exams", "Prescription glasses", "Contact lenses", "Designer frames"],
      price: "Eye exam from $79",
      rating: 4.7,
      reviews: 1432,
    },
    {
      id: "salon",
      name: "Hair Salon",
      description: "Haircuts, styling, and beauty services",
      icon: Scissors,
      color: "bg-pink-500",
      features: ["Haircuts", "Hair coloring", "Styling", "Beauty treatments"],
      price: "Haircut from $12.95",
      rating: 4.3,
      reviews: 789,
    },
  ]

  const ServiceCard = ({ service }) => {
    const Icon = service.icon

    return (
      <div className="bg-white rounded-lg border hover:shadow-lg transition-shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${service.color} text-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{service.rating}</span>
            </div>
            <p className="text-xs text-gray-600">({service.reviews} reviews)</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Services Include:</h4>
          <ul className="space-y-1">
            {service.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">Pricing</p>
            <p className="font-medium text-gray-900">{service.price}</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1">
            <span>Book Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <span>Home</span> <span className="mx-2">/</span> <span className="text-gray-900">Services</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ShopSculpt Services</h1>
          <p className="text-gray-600">Convenient services to make your life easier</p>
        </div>

        {/* Location Selector */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Services Available At</h3>
                <p className="text-gray-600">{selectedLocation}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Change Location</button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hours */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Service Hours</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">10:00 AM - 6:00 PM</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">*Hours may vary by location and service type</p>
          </div>

          {/* Booking */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Easy Booking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Schedule your service appointment online or walk in for immediate assistance.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium">
                Schedule Online
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium">
                Call Store
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
