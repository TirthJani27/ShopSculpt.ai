/**
 * Security Settings Component
 * Allows users to change password and manage security settings
 * Includes password validation and confirmation
 */
"use client"
import { useState } from "react"
import { Eye, EyeOff, Shield, Key, CheckCircle } from "lucide-react"

export default function SecuritySettings() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = "New password must be different from current password"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Password update error:", error)
      setErrors({ general: "Failed to update password. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>Password updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        {/* Change Password Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Change Password
          </h3>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.currentPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.newPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Security Tips */}
      <div className="mt-8 pt-6 border-t">
        <h4 className="font-semibold text-gray-900 mb-3">Password Security Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use at least 8 characters with a mix of letters, numbers, and symbols</li>
          <li>• Don't use personal information like your name or birthday</li>
          <li>• Use a unique password that you don't use for other accounts</li>
          <li>• Consider using a password manager to generate and store strong passwords</li>
        </ul>
      </div>
    </div>
  )
}
