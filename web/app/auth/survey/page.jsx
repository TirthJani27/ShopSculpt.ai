/**
 * Survey Form Page Component
 * Mandatory survey form after initial registration
 * Collects additional user information including interests and personal details
 * Updated to use the new register function from AuthContext
 */


"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { MapPin, Calendar, User, Heart, ArrowLeft, CheckCircle } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"

export default function SurveyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoggedIn, register } = useAuth()

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    address: "",
    state: "",
    pinCode: "",
    interests: [],
    persona: [],
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  // Get user data from URL params (passed from registration)
  const userData = searchParams.get("userData") ? JSON.parse(decodeURIComponent(searchParams.get("userData"))) : null

  // Redirect if no user data or already logged in
  useEffect(() => {
    if (!userData) {
      router.push("/auth/signup")
    }
    if (isLoggedIn) {
      router.push("/profile")
    }
  }, [userData, isLoggedIn, router])

  // Interest categories with icons
  const interestCategories = [
    { id: "gym", label: "Gym Equipments", icon: "🏋️" },
    { id: "clothing", label: "Clothing", icon: "👕" },
    { id: "electronics", label: "Electronics", icon: "📱" },
    { id: "furniture", label: "Furniture", icon: "🛋️" },
    { id: "iot", label: "IoT Gadgets", icon: "🔌" },
    { id: "laptop", label: "Laptops", icon: "💻" },
    { id: "mobile", label: "Mobile Phones", icon: "📱" },
    { id: "others", label: "Others", icon: "🛍️" },
  ]

  // Persona category
  const personaCategories = [
    // Lifestyle & Values-Based
    { id: 'ecoconscious', label: 'Budget Shopper' },
    { id: 'luxuryseeker', label: 'Luxury Seeker' },
    { id: 'localgoods', label: 'Local Goods Supporter' },
    { id: 'ethicalbuyer', label: 'Ethical Buyer' },
    { id: 'minimalist', label: 'Minimalist' },

    // Life Stage
    { id: 'newparent', label: 'New Parent' },
    { id: 'collegestudent', label: 'College Student' },
    { id: 'youngprofessional', label: 'Young Professional' },
    { id: 'retiredshopper', label: 'Retired Shopper' },
    { id: 'homeowner', label: 'First-Time Homeowner' },

    // Interest-Based
    { id: 'techenthusiast', label: 'Tech Enthusiast' },
    { id: 'fashionlover', label: 'Fashion Lover' },
    { id: 'fitnessbuff', label: 'Fitness Buff' },
    { id: 'beautyguru', label: 'Beauty Guru' },
    { id: 'homechef', label: 'Home Chef' },

    // Shopping Style
    { id: 'dealhunter', label: 'Deal Hunter' },
    { id: 'impulsebuyer', label: 'Impulse Buyer' },
    { id: 'brandloyalist', label: 'Brand Loyalist' },
    { id: 'seasonalshopper', label: 'Seasonal Shopper' },
    { id: 'giftgiver', label: 'Gift Giver' },

    // Health & Dietary
    { id: 'glutenfree', label: 'Gluten-Free Buyer' },
    { id: 'organiconly', label: 'Organic Only' },
    { id: 'ketofriendly', label: 'Keto Friendly Shopper' },
    { id: 'allergyconscious', label: 'Allergy-Conscious Shopper' },
    { id: 'diabeticfriendly', label: 'Diabetic-Friendly Shopper' },
  ]

  // Indian states list
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Andaman and Nicobar Islands",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleInterestChange = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))

    // Clear interests error
    if (errors.interests) {
      setErrors((prev) => ({
        ...prev,
        interests: "",
      }))
    }
  }


  const handlePersonaChange = (personaId) => {
    setFormData((prev) => ({
      ...prev,
      persona: prev.persona.includes(personaId)
        ? prev.persona.filter((id) => id !== personaId)
        : [...prev.persona, personaId],
    }));

    // Clear persona error
    if (errors.persona) {
      setErrors((prev) => ({
        ...prev,
        persona: "",
      }));
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 13) {
        newErrors.dateOfBirth = "You must be at least 13 years old"
      }
    }

    // Gender validation
    if (!formData.gender) {
        newErrors.gender = "Please select your gender"
    }


    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters"
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required"
    }

    // Pin code validation
    if (!formData.pinCode) {
      newErrors.pinCode = "Pin code is required"
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Pin code must be 6 digits"
    }

    // Interests validation (minimum 3)
    if (formData.interests.length < 3) {
      newErrors.interests = "Please select at least 3 interests"
    }

    //Persona validation
    if (formData.persona.length < 3) {
      newErrors.persona = "Please Select 3 Options"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Combine user data with survey data
      const completeUserData = {
        ...userData,
        ...formData,
      }

      // Register user and get the complete user object
      const registeredUser = register(completeUserData)

      // Update auth context with complete user data
      login(registeredUser)

      // Redirect to profile page
      router.push("/profile")
    } catch (error) {
      console.error("Survey submission error:", error)
      setErrors({ general: "Failed to complete registration. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (!userData) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 md:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="w-6 md:w-8 h-6 md:h-8 text-green-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Almost Done!</h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base">Help us personalize your shopping experience</p>
          <div className="mt-4 bg-blue-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Step 2 of 2</p>
        </div>

        {/* Survey Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {/* Welcome Message */}
            <div className="text-center pb-6 border-b">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Welcome, {userData.name}!</h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Let's get to know you better</p>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-300" : "border-gray-300"
                  }`}
              />
              {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Gender
              </label>
              <div className="flex flex-col   ">
                {["Male", "Female"].map((option) => (
                  <label key={option} className="flex items-center space-x-2 text-sm">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Complete Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter your complete address including street, area, city"
                className={`w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.address ? "border-red-300" : "border-gray-300"
                  }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* State and Pin Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-300" : "border-gray-300"
                    }`}
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
              </div>

              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit pin code"
                  maxLength={6}
                  className={`w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pinCode ? "border-red-300" : "border-gray-300"
                    }`}
                />
                {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>}
              </div>
            </div>

            {/* Interests */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Heart className="w-4 h-4 inline mr-2" />
                What are you interested in buying? (Select at least 3)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestCategories.map((category) => (
                  <label
                    key={category.id}
                    className={`flex flex-col items-center p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${formData.interests.includes(category.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(category.id)}
                      onChange={() => handleInterestChange(category.id)}
                      className="sr-only"
                    />
                    <span className="text-xl md:text-2xl mb-2">{category.icon}</span>
                    <span className="text-xs md:text-sm font-medium text-center leading-tight">{category.label}</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.interests.length} / 8 (minimum 3 required)
              </p>
              {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
            </div>



            {/*persona categories - About Me */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Heart className="w-4 h-4 inline mr-2" />
                What are you interested in buying? (Select at least 3)
              </label>

              <div className="flex flex-wrap gap-2">
                {personaCategories.map((category) => {
                  const selected = formData.persona.includes(category.id);

                  return (
                    <button
                      type="button"
                      key={category.id}
                      onClick={() => handlePersonaChange(category.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors
                          ${selected ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"}
                        `}
                    >
                      <span className="text-lg">{category.icon}</span>
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Completing Registration...</span>
                </div>
              ) : (
                "Complete Registration"
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-6">
            <Link
              href="/auth/signup"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Registration</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

