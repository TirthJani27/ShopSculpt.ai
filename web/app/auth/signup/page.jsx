/**
 * Sign Up Page Component
 * User registration form with modern design matching the reference image
 * Includes form validation and responsive layout
 */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, Key } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

export default function SignUpPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First Name is required";
    } else if (formData.firstname.trim().length < 3) {
      newErrors.firstname = "First Name must be at least 3 characters";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last Name is required";
    } else if (formData.lastname.trim().length < 3) {
      newErrors.lastname = "Last Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms of service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", {
        email: formData.email,
        password: formData.password,
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
      });

      const { user, token } = res.data;
      login(user);
      localStorage.setItem("token", `Bearer ${token}`);
      router.push(`/auth/survey?userId=${encodeURIComponent(user._id)}`);
      window.toast?.success(
        "Registered successfully! Let's complete your profile."
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrors({ general: message });
      window.toast?.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ShopSculpt Account Registration Services
          </h1>
        </div>

        {/* Main Registration Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Sign up
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {errors.general}
                    </div>
                  )}
                  {/* First Name and Last Name Fields */}
                  <div className="flex gap-4">
                    {/* First Name Field */}
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={formData.firstname || ""}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.firstname
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          placeholder="First Name"
                        />
                      </div>
                      {errors.firstname && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstname}
                        </p>
                      )}
                    </div>
                    {/* Last Name Field */}
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          value={formData.lastname || ""}
                          onChange={handleInputChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.lastname
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          placeholder="Last Name"
                        />
                      </div>
                      {errors.lastname && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastname}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Email Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="Your Email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {/* Password Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.password ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* Confirm Password Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                        placeholder="Repeat your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  {/* Terms Agreement */}
                  <div>
                    <div className="flex items-start">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I agree all statements in{" "}
                        <span className="text-blue-600 hover:text-blue-500">
                          Terms of service
                        </span>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.terms}
                      </p>
                    )}
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating Account..." : "REGISTER"}
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign in here
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
                    Almost there! Please complete the survey to finalize your
                    registration.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:block bg-gradient-to-br from-blue-50 to-purple-50 p-12">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  {/* Colorful illustration placeholder - in real app, use the actual illustration */}
                  <img src="/logo3.png" alt="" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Join Our Shopping Community
                  </h3>
                  <p className="text-gray-600">
                    Create your account and start exploring amazing deals and
                    products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
