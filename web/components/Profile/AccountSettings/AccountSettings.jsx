/**
 * Account Settings Component
 * User profile settings, name change, email update, interests, and about me management
 * Form validation and responsive design
 * Updated to allow interests and about me editing with proper validation
 */


"use client"
import { useState } from "react"
import { User, Bell, Save, CheckCircle, Heart, Edit3 } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"

export default function AccountSettings() {
  const { user, login } = useAuth() // login function updates user data
  const [activeSection, setActiveSection] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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
    { id: 'eco-conscious', label: 'Eco-Conscious Shopper' },
    { id: 'luxury-seeker', label: 'Luxury Seeker' },
    { id: 'local-goods', label: 'Local Goods Supporter' },
    { id: 'ethical-buyer', label: 'Ethical Buyer' },
    { id: 'minimalist', label: 'Minimalist' },

    // Life Stage
    { id: 'new-parent', label: 'New Parent' },
    { id: 'college-student', label: 'College Student' },
    { id: 'young-professional', label: 'Young Professional' },
    { id: 'retired-shopper', label: 'Retired Shopper' },
    { id: 'homeowner', label: 'First-Time Homeowner' },

    // Interest-Based
    { id: 'tech-enthusiast', label: 'Tech Enthusiast' },
    { id: 'fashion-lover', label: 'Fashion Lover' },
    { id: 'fitness-buff', label: 'Fitness Buff' },
    { id: 'beauty-guru', label: 'Beauty Guru' },
    { id: 'home-chef', label: 'Home Chef' },

    // Shopping Style
    { id: 'deal-hunter', label: 'Deal Hunter' },
    { id: 'impulse-buyer', label: 'Impulse Buyer' },
    { id: 'brand-loyalist', label: 'Brand Loyalist' },
    { id: 'seasonal-shopper', label: 'Seasonal Shopper' },
    { id: 'gift-giver', label: 'Gift Giver' },

    // Health & Dietary
    { id: 'gluten-free', label: 'Gluten-Free Buyer' },
    { id: 'organic-only', label: 'Organic Only' },
    { id: 'keto-friendly', label: 'Keto Friendly Shopper' },
    { id: 'allergy-conscious', label: 'Allergy-Conscious Shopper' },
    { id: 'diabetic-friendly', label: 'Diabetic-Friendly Shopper' },
  ]

  // Profile form state with actual user data
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    address: user?.address || "",
    state: user?.state || "",
    pinCode: user?.pinCode || "",
    interests: user?.interests || [],
    persona: user?.persona || [],
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    smsNotifications: false,
  })

  const [errors, setErrors] = useState({})

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
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
    setProfileData((prev) => ({
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
    setProfileData((prev) => ({
      ...prev,
      persona: prev.persona.includes(personaId)
        ? prev.persona.filter((id) => id !== personaId)
        : [...prev.persona, personaId],
    }))

    // Clear Persona error
    if (errors.persona) {
      setErrors((prev) => ({
        ...prev,
        persona: "",
      }))
    }
  }


  const validateProfileForm = () => {
  const newErrors = {}

  // Name
  if (!profileData.name.trim()) {
    newErrors.name = "Name is required"
  } else if (profileData.name.trim().length < 2) {
    newErrors.name = "Name must be at least 2 characters"
  }

  // Email
  if (!profileData.email.trim()) {
    newErrors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
    newErrors.email = "Please enter a valid email"
  }

  // Date of Birth
  if (!profileData.dateOfBirth) {
    newErrors.dateOfBirth = "Date of birth is required"
  }

  // Address
  if (!profileData.address.trim()) {
    newErrors.address = "Address is required"
  }

  // State
  if (!profileData.state.trim()) {
    newErrors.state = "State is required"
  }

  // Pin Code
  if (!profileData.pinCode.trim()) {
    newErrors.pinCode = "Pin code is required"
  } else if (!/^\d{6}$/.test(profileData.pinCode)) {
    newErrors.pinCode = "Pin code must be 6 digits"
  }

  // Phone is optional, but validate if present
  if (profileData.phone && !/^\+?[\d\s\-()]{10,}$/.test(profileData.phone)) {
    newErrors.phone = "Please enter a valid phone number"
  }

  // Interests
  if (profileData.interests.length < 3) {
    newErrors.interests = "Please select at least 3 interests"
  }

  // Persona
  if (profileData.persona.length < 3) {
    newErrors.persona = "Please select at least 3 persona"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}


  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    if (!validateProfileForm()) return

    setIsLoading(true)
    setSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user data in auth context
      const updatedUser = {
        ...user,
        ...profileData,
      }
      login(updatedUser)

      setSuccess(true)
      console.log("Profile updated:", profileData)

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Profile update error:", error)
      setErrors({ general: "Failed to update profile. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const sections = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "interests", label: "Shopping Interests", icon: Heart },
    { id: "persona", label: "Shopping Persona", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b overflow-x-auto">
        <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 min-w-max">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeSection === section.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.label.split(" ")[0]}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-4 md:p-6">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* Profile Information */}
        {activeSection === "profile" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>


                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="flex items-center gap-6">
                    {["male", "female"].map((option) => (
                      <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={profileData.gender === option}
                          onChange={handleProfileInputChange}
                          className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${errors.gender ? "ring-2 ring-red-400" : ""
                            }`}
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    ))}
                  </div>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>



                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={10}
                    value={profileData.phone}
                    onChange={handleProfileInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? "border-red-300" : "border-gray-300"
                      }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Date of Birth Field */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleProfileInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-6 border-t">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Address Information</h4>

                <div className="space-y-4">
                  {/* Complete Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* State */}
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={profileData.state}
                        onChange={handleProfileInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your state"
                      />
                    </div>

                    {/* Pin Code */}
                    <div>
                      <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-2">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={profileData.pinCode}
                        onChange={handleProfileInputChange}
                        maxLength={6}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pinCode ? "border-red-300" : "border-gray-300"
                          }`}
                        placeholder="Enter 6-digit pin code"
                      />
                      {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Shopping Interests */}
        {activeSection === "interests" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shopping Interests</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What are you interested in buying? (Select at least 3)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {interestCategories.map((category) => (
                    <label
                      key={category.id}
                      className={`flex flex-col items-center p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${profileData.interests.includes(category.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={profileData.interests.includes(category.id)}
                        onChange={() => handleInterestChange(category.id)}
                        className="sr-only"
                      />
                      <span className="text-xl md:text-2xl mb-2">{category.icon}</span>
                      <span className="text-xs md:text-sm font-medium text-center leading-tight">{category.label}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {profileData.interests.length} / 8 (minimum 3 required)
                </p>
                {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Interests</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}


        {/* Shopping Persona */}
        {activeSection === "persona" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shopping Persona</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What are your Persona? (Select at least 3)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {personaCategories.map((category) => (
                    <label
                      key={category.id}
                      className={`flex flex-col items-center p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${profileData.persona.includes(category.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={profileData.persona.includes(category.id)}
                        onChange={() => handlePersonaChange(category.id)}
                        className="sr-only"
                      />
                      <span className="text-xl md:text-2xl mb-2">{category.icon}</span>
                      <span className="text-xs md:text-sm font-medium text-center leading-tight">{category.label}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {profileData.persona.length} / 25 (minimum 3 required)
                </p>
                {errors.persona && <p className="mt-1 text-sm text-red-600">{errors.persona}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Persona</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}



        {/* Notification Settings */}
        {activeSection === "notifications" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                    <p className="text-sm text-gray-600">
                      {key === "orderUpdates" && "Get notified about your order status"}
                      {key === "promotions" && "Receive promotional offers and deals"}
                      {key === "newsletter" && "Weekly newsletter with new products"}
                      {key === "smsNotifications" && "SMS notifications for important updates"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}





