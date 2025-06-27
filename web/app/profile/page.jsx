/**
 * User Profile Page
 * Displays user account information, orders, cart, and account settings
 * Responsive dashboard layout with navigation tabs
 */
"use client"
import { useState } from "react"
import Header from "../../components/Layout/Header/Header"
import Footer from "../../components/Layout/Footer/Footer"
import ProfileSidebar from "../../components/Profile/ProfileSidebar/ProfileSidebar"
import ProfileOverview from "../../components/Profile/ProfileOverview/ProfileOverview"
import OrderHistory from "../../components/Profile/OrderHistory/OrderHistory"
import AccountSettings from "../../components/Profile/AccountSettings/AccountSettings"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "2023",
    totalOrders: 24,
    totalSpent: 2450.99,
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview user={user} />
      case "orders":
        return <OrderHistory />
      case "settings":
        return <AccountSettings user={user} />
      default:
        return <ProfileOverview user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and view your order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <ProfileSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
