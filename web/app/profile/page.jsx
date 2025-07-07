"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import ProfileSidebar from "../../components/Profile/ProfileSidebar/ProfileSidebar";
import ProfileOverview from "../../components/Profile/ProfileOverview/ProfileOverview";
import PersonalInfo from "../../components/Profile/PersonalInfo/PersonalInfo";
import ProfileCart from "../../components/Profile/ProfileCart/ProfileCart";
import ProfileWishlist from "../../components/Profile/ProfileWishlist/ProfileWishlist";
import ProfileOrders from "../../components/Profile/ProfileOrders/ProfileOrders";
import AccountSettings from "../../components/Profile/AccountSettings/AccountSettings";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading, user, login } = useAuth();

  // Get tab from URL params or default to overview
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "overview");

  // Update tab when URL changes
  useEffect(() => {
    if (tabFromUrl) setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  // Check if user exists, else move to signup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isLoading && !user && token) {
      axios
        .get("/api/user/profile", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          if (!response.data.user) {
            router.push("/auth/signup?redirect=/profile");
          }
        })
        .catch(() => {
          router.push("/auth/signup?redirect=/profile");
        });
    }
  }, [user, isLoading, router]);

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && token) {
      if (!isLoggedIn) {
        axios
          .get("/api/user/profile", {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((response) => {
            login(response.data.user);
          })
          .catch(() => {
            localStorage.removeItem("token");
            router.push("/auth/login?redirect=/profile");
          });
      }
    }
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login?redirect=/profile");
    }
  }, [isLoggedIn, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not logged in (will redirect)
  if (!isLoggedIn) {
    return null;
  }

  // Handle edit profile click from PersonalInfo component
  const handleEditProfile = (targetTab) => {
    setActiveTab(targetTab);
    // Update URL without page reload
    const newUrl = `/profile?tab=${targetTab}`;
    window.history.pushState({}, "", newUrl);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview />;
      case "personal":
        return <PersonalInfo onEditClick={handleEditProfile} />;
      case "orders":
        return <ProfileOrders />;
      case "cart":
        return <ProfileCart />;
      case "wishlist":
        return <ProfileWishlist />;
      case "settings":
        return <AccountSettings />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Welcome back, {user?.fullname?.firstname || "User"}! Manage your
            account settings and view your activity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
