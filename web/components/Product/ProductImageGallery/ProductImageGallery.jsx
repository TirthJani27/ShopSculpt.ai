/**
 * Product Image Gallery Component
 * Displays product images with thumbnail navigation
 * Responsive design with zoom functionality
 */
"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

export default function ProductImageGallery({ images, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-white rounded-lg border overflow-hidden group">
        <div className="aspect-square relative">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Zoom Button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square rounded-lg border-2 overflow-hidden ${
                index === currentImageIndex ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-600">
          {currentImageIndex + 1} of {images.length}
        </div>
      )}
    </div>
  )
}
