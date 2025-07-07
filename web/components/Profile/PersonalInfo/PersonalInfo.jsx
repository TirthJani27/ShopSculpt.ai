/**
 * Personal Information Component
 * Displays user's personal information from registration and survey
 * Shows all details entered during the registration process
 * Updated with working "Edit Profile" button that navigates to account settings
 */
"use client";
import { Calendar, MapPin, Heart, User, Mail, Phone, Edit } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export default function PersonalInfo({ onEditClick }) {
  const { user } = useAuth();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format interests for display
  const formatInterests = (interests) => {
    if (!interests || interests.length === 0) return "None selected";

    const interestLabels = {
      gym: "Gym Equipments",
      clothing: "Clothing",
      electronics: "Electronics",
      furniture: "Furniture",
      iot: "IoT Gadgets",
      laptop: "Laptops",
      mobile: "Mobile Phones",
      others: "Others",
    };

    return interests
      .map((interest) => interestLabels[interest] || interest)
      .join(", ");
  };

    // Format for Persona display.
    const formatPersona = (persona) => {
    if (!persona || persona.length === 0) return "None selected"

    const PersonaLabels = {
     Ecoconscious: "Eco-Conscious Shopper" ,
     Luxuryseeker: "Luxury Seeker" ,
     Localgoods: "Local Goods Supporter" ,
     Ethicalbuyer: "Ethical Buyer", 
     Minimalist: "Minimalist",
     Newparent: "New Parent" ,
     Collegestudent: "College Student" ,
     Youngprofessional: "Young Professional" ,
     Retiredshopper: "Retired Shopper" ,
     homeowner: "First-Time Homeowner",

  // Interest-Based
     Techenthusiast: "Tech Enthusiast" ,
     Fashionlover: 'Fashion Lover' ,
     Fitnessbuff: "Fitness Buff" ,
     Beautyguru: "Beauty Guru" ,
     Homechef: "Home Chef" ,

  // Shopping Style
   Dealhunter: "Deal Hunter" ,
   Impulsebuyer: "Impulse Buyer", 
   Brandloyalist: "Brand Loyalist", 
   Seasonalshopper: "Seasonal Shopper", 
   Giftgiver: "Gift Giver" ,

  // Health & Dietary
    Glutenfree: "Gluten-Free Buyer" ,
    Organiconly: "Organic Only" ,
    Ketofriendly: "Keto Friendly Shopper" ,
    Diabeticfriendly: "Diabetic-Friendly Shopper",
    }

    return persona.map((persona) => PersonaLabels[persona] || persona).join(", ")
  }

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick("settings");
    }
  };



  return (
    <div className="bg-white rounded-lg border p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Personal Information
        </h2>
        <button
          onClick={handleEditClick}
          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 border-b pb-2">
            Basic Details
          </h3>

          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">Full Name</p>
              <p className="text-gray-900 break-words">
                {user?.fullname?.firstname + " " + user?.fullname.lastname}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">Gender</p>
              <p className="text-gray-900 break-words">{user?.gender|| "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">Email Address</p>
              <p className="text-gray-900 break-words">
                {user?.email || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">Phone Number</p>
              <p className="text-gray-900 break-words">
                {user?.phone || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">Date of Birth</p>
              <p className="text-gray-900">{formatDate(user?.dob)}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 border-b pb-2">
            Address Details
          </h3>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">
                Complete Address
              </p>
              <p className="text-gray-900 break-words">
                {user?.region || "Not provided"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">State</p>
              <p className="text-gray-900 break-words">
                {user?.state || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pin Code</p>
              <p className="text-gray-900">{user?.pinCode || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" />
          Shopping Interests
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-900 break-words">
            {formatInterests(user?.interests)}
          </p>
        </div>
      </div>

      {/* Persona Section */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" />
          About Persona
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap gap-2">
          {(Array.isArray(user?.persona) ? user.persona : formatPersona(user?.persona).split(',')).map((item, index) => (
            <span
              key={index}
              className="bg-gray-200 text-uppercase text-grey-900 text-sm font-medium px-3 py-1 rounded-full capitalize"
            >
              {item.trim()}
            </span>
          ))}
        </div>
      </div>

      

      {/* Registration Info */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Member Since:</span>{" "}
            {formatDate(user?.registrationDate)}
          </div>
          <div>
            <span className="font-medium">Account Status:</span>
            <span className="ml-2 text-green-600 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
