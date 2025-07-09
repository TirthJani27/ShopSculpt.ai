


// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import {
//   Star,
//   Heart,
//   ShoppingCart,
//   Check,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react"
// import { useAuth } from "../../contexts/AuthContext"
// import { useWishlist } from "../../contexts/WishlistContext"
// import { useCart } from "../../contexts/CartContext"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Autoplay, Navigation } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/navigation"

// export default function ProductCardCarousel() {
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setIsLoading(false)
//     }, 400)
//     return () => clearTimeout(timeout)
//   }, [])

//   const featuredProducts = [

//   ]

//   const { isLoggedIn } = useAuth()
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
//   const { addToCart, isInCart } = useCart()
//   const [showToast, setShowToast] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")
//   const [isAddingToCart, setIsAddingToCart] = useState(false)

//   const showToastMessage = (message) => {
//     setToastMessage(message)
//     setShowToast(true)
//     setTimeout(() => setShowToast(false), 3000)
//   }

//   const handleWishlistClick = (e, product) => {
//     e.preventDefault()
//     e.stopPropagation()

//     if (!isLoggedIn) {
//       showToastMessage("Please sign in to add items to wishlist")
//       return
//     }

//     const result = isInWishlist(product.id)
//       ? removeFromWishlist(product.id)
//       : addToWishlist(product)

//     showToastMessage(result.message)
//   }

//   const handleAddToCart = async (e, product) => {
//     e.preventDefault()
//     e.stopPropagation()

//     if (!isLoggedIn) {
//       showToastMessage("Please sign in to add items to cart")
//       return
//     }

//     setIsAddingToCart(true)
//     await new Promise((resolve) => setTimeout(resolve, 500))
//     const result = addToCart(product)
//     showToastMessage(result.message)
//     setIsAddingToCart(false)
//   }

//   return (
//     <div className="mt-12 mb-12 mx-[150px]">
//       <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-48">
//           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : featuredProducts.length > 0 ? (
//         <div className="relative">
//           <Swiper
//             modules={[Autoplay, Navigation]}
//             spaceBetween={20}
//             slidesPerView={2}
//             loop
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1024: { slidesPerView: 4 },
//               1280: { slidesPerView: 5 },
//             }}
//           >
//             {featuredProducts.map((product) => {
//               const inWishlist = isInWishlist(product.id)
//               const inCartAlready = isInCart(product.id)

//               return (
//                 <SwiperSlide key={product.id}>
//                   <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group relative">
//                     {/* Badge */}
//                     {product.badge && (
//                       <div className="mb-2">
//                         <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
//                           {product.badge}
//                         </span>
//                       </div>
//                     )}

//                     {/* Image */}
//                     <Link href={`/product/${product.id}`}>
//                       <div className="relative mb-3">
//                         <img
//                           src={product.image || "/placeholder.svg"}
//                           alt={product.title}
//                           className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform"
//                         />
//                       </div>
//                     </Link>

//                     {/* Wishlist */}
//                     <button
//                       onClick={(e) => handleWishlistClick(e, product)}
//                       className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${
//                         inWishlist
//                           ? "bg-red-500 text-white"
//                           : "bg-white text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100"
//                       }`}
//                     >
//                       <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
//                     </button>

//                     {/* Product Info */}
//                     <Link href={`/product/${product.id}`}>
//                       <div className="space-y-2">
//                         <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
//                           {product.title}
//                         </h3>

//                         <div className="flex items-center space-x-1">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-3 h-3 ${
//                                 i < Math.floor(product.rating)
//                                   ? "text-yellow-400 fill-current"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                           <span className="text-xs text-gray-600">({product.reviews})</span>
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <span className="text-lg font-bold text-gray-900">
//                             ${product.price.toFixed(2)}
//                           </span>
//                           {product.originalPrice && (
//                             <span className="text-sm text-gray-500 line-through">
//                               ${product.originalPrice.toFixed(2)}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </Link>

//                     {/* Add to Cart Button */}
//                     <button
//                       onClick={(e) => handleAddToCart(e, product)}
//                       disabled={isAddingToCart}
//                       className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors mt-3 flex items-center justify-center space-x-1 ${
//                         inCartAlready
//                           ? "bg-green-600 hover:bg-green-700 text-white"
//                           : "bg-blue-600 hover:bg-blue-700 text-white"
//                       } disabled:opacity-50 disabled:cursor-not-allowed`}
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                           <span>Adding...</span>
//                         </>
//                       ) : inCartAlready ? (
//                         <>
//                           <Check className="w-4 h-4" />
//                           <span>In Cart</span>
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCart className="w-4 h-4" />
//                           <span>Add to cart</span>
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </SwiperSlide>
//               )
//             })}
//           </Swiper>

//           {/* Custom Arrows */}
//           <button className="swiper-prev absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow z-10">
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <button className="swiper-next absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow z-10">
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-500">No products available.</p>
//       )}

//       {showToast && (
//         <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
//           {toastMessage}
//         </div>
//       )}
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useWishlist } from "../../contexts/WishlistContext"
import { useCart } from "../../contexts/CartContext"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export default function ProductCardCarousel() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [])

  const featuredProducts = [
    {
      id: 1,
      title: "Apple iPhone 16 Pro",
      price: 1099.0,
      originalPrice: 1199.0,
      rating: 4.5,
      reviews: 1234,
      image:
        "https://i5.walmartimages.com/seo/Restored-Apple-iPhone-15-Pro-Max-1TB-Natural-Titanium-Factory-Unlocked-Refurbished_14e7fa9d-b973-4829-80ec-03d1633d647e.fe90c31e06d554eb0c949ebb82959669.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    },
    {
      id: 2,
      title: 'Samsung 65" 4K TV',
      price: 599.99,
      originalPrice: 799.99,
      rating: 4.3,
      reviews: 856,
      image:
        "https://i5.walmartimages.com/seo/Samsung-DU8000-UN50DU8000F-50-Smart-LED-LCD-TV-4K-UHDTV-High-Dynamic-Range-HDR-Black_0933d768-b787-47c1-b32a-c89c80d63706.0eb9c5775c5a392890755950b189c0ad.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    },
    {
      id: 3,
      title: "Asus Rog Strix 16",
      price: 1449.99,
      originalPrice: 1699.99,
      rating: 4.7,
      reviews: 2341,
      image:
        "https://i5.walmartimages.com/seo/ASUS-ROG-Strix-G16-2025-16-Gaming-Laptop-Ryzen-9-TBD-16GB-RTX-50XX-1TB-SSD-G614FM-WS94_8e85f0bb-5fbb-4e70-b78e-01f354eeba1e.6d9b91d23872d2f6c32690b15cff41b6.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    },
    {
      id: 4,
      title: "Yonex Astrox Attack 9",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviews: 1876,
      image:
        "https://i5.walmartimages.com/seo/Yonex-Badminton-Racquet-Astrox-Attack-9-Black-G4-4U_2ca3a073-c9bb-47d8-b678-189e0fd37770.8387a06cbc11cd78573d4eb2140a1693.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    },
    {
      id: 5,
      title: "Utility Workout Bench",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 967,
      image:
        "https://i5.walmartimages.com/seo/K-Kingkang-Adjustable-Weight-Bench-Utility-Workout-Bench-for-Home-Gym-Foldable-Incline-Decline-Benches-for-Full-Body-Workout-660LB_afc37fe6-f8b4-4749-a808-e61192a5144f.b54e2ed438c2de356cb6648fbe2dac61.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    },
    {
      id: 6,
      title: "Drawer Storage Cabinet",
      price: 59.99,
      originalPrice: 65.99,
      rating: 4.9,
      reviews: 3421,
      image:
        "https://i5.walmartimages.com/seo/Yangming-8-Drawer-Fabric-Dresser-for-Bedroom-Chest-of-Drawer-Organizer-Storage-Cabinet-for-Closet-Entryway-Black_ca8794cd-12dc-4765-b7b7-a57c6130ffef.c0d46ed4f057239ee585f791dbaa6d96.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    },
  ]

  const { isLoggedIn } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart, isInCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleWishlistClick = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      showToastMessage("Please sign in to add items to wishlist")
      return
    }

    const result = isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product)

    showToastMessage(result.message)
  }

  const handleAddToCart = async (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      showToastMessage("Please sign in to add items to cart")
      return
    }

    setIsAddingToCart(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    const result = addToCart(product)
    showToastMessage(result.message)
    setIsAddingToCart(false)
  }

  return (
    <div className="mt-12 mb-12 mx-4 sm:mx-6 lg:mx-24">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Recommended Products</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : featuredProducts.length > 0 ? (
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            breakpoints={{
              480: { slidesPerView: 1.3 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {featuredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id)
              const inCartAlready = isInCart(product.id)

              return (
                <SwiperSlide key={product.id}>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer group relative">
                    <Link href={`/product/${product.id}`}>
                      <div className="relative mb-3 w-full h-40 sm:h-44 md:h-48 flex items-center justify-center overflow-hidden bg-white rounded">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                    </Link>

                    <button
                      onClick={(e) => handleWishlistClick(e, product)}
                      className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${inWishlist
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                    </button>

                    <Link href={`/product/${product.id}`}>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                          {product.title}
                        </h3>

                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                                }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600">({product.reviews})</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={isAddingToCart}
                      className={`w-full py-2 px-4 rounded text-sm font-medium transition-colors mt-3 flex items-center justify-center space-x-1 ${inCartAlready
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : inCartAlready ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>In Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>

          {/* Responsive Custom Arrows */}
          <button className="swiper-prev absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 lg:-left-6 bg-white border rounded-full p-2 shadow z-10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="swiper-next absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 lg:-right-6 bg-white border rounded-full p-2 shadow z-10">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
