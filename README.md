# 🛒 ShopSculpt.ai – Personalized Walmart Homepage Simulator

---

## 🚀 Overview

**ShopSculpt.ai** is a dynamic e-commerce web app that delivers **hyper-personalized Walmart-like homepage experiences** for each user.  
By analyzing user personas, shopping behavior, and browsing patterns, the platform adapts homepage layout, banners, product recommendations, and ads in real-time.

This project aligns with Walmart’s **Content Decision Platform (CDP)** vision by demonstrating **AI-powered, persona-based shopping personalization**.

---

## 🗓️ Hackathon Target (Phase 1 Scope)

- **Demo Date:** 5th July 2025  
- **Hackathon Focus:**  
✅ User-side features  
✅ AI-based mock recommendation engine  
✅ Frontend & Backend API integrations  

*Note: Admin panel and production database setup are planned for Post-Hackathon (Phase 2).*

---

## ✅ Features Included for Hackathon Demo

### 👥 1. User Authentication (Optional for Demo)

- Email-based OTP login/registration (Using external service like **Firebase/Resend** or mocked for demo)
- Option to **skip login** for faster user entry (Hackathon flexibility)

---

### 📝 2. User Onboarding Flow

- Onboarding form after signup/login
- Captures:
  - Full Name
  - Age Group
  - Gender
  - Region
  - Shopping Interests
  - Persona Preferences (Max 2)
  - Price Range Preference (Budget-Friendly / Mid-Range / Premium)
  - Shopping Frequency (Rarely / Monthly / Weekly / Daily)

- Assigns user a **shopping persona** like:
  - Budget Shopper
  - Vegan Buyer
  - Parent Shopper  
  *(Based on form inputs)*

---

### 🏠 3. Dynamic Persona-Based Homepage

- Homepage layout, banners, featured products, and ad sections **change dynamically based on user persona**
- Personalized welcome message
- Recommended products section
- Mock predictive shopping tiles and AI-based smart ads

---

### 📋 4. Product Categories

- List of clickable product categories like:
  - Electronics
  - Grocery
  - Fashion
  - Home Essentials  
- On-click → Displays relevant mock products

---

### 🔍 5. Product Search Functionality

- Search bar for keyword-based product search
- Filters mock product data (category-wise or name-wise)
- Displays results or **“No Products Found”** message

---

### 🛒 6. Shopping Cart Management

- **Add to Cart** for all products
- **View Cart** page showing:
  - List of items
  - Quantity
  - Individual and total price
- **Remove from Cart** functionality
- Global cart state managed with **Zustand**

---

### 💳 7. Payment Simulation (Checkout Flow)

- **Cart Summary** before payment
- **Dummy Payment Form** (card number, CVV, expiry date - optional)
- **Payment Success Screen** with order summary
- Post-payment → Cart cleared and transaction logged (mock)

---

### 👤 8. User Profile Page

- Displays:
  - User Name
  - Email
  - Persona Type
  - Shopping Interests
- Optional profile editing (if time permits)

---

### 📄 9. About Us Page

- Static project info
- Hackathon vision
- Team member details

---

## ✅ AI-Powered Recommendation Engine (Hackathon Phase)

### 📊 User Behavior Tracking (Mock Data Storage)

| Data | Tracking Method |
|---|---|
| Purchase History | After each simulated checkout |
| Search History | Log user search keywords |
| Browsing Time | Track time spent on product/category pages (optional for hackathon) |

---

### 🤖 AI Recommendation Logic (Heuristic Rule-Based)

| User Action | Score |
|---|---|
| Viewed Product (Over X seconds) | +2 |
| Searched for Product Keywords | +3 |
| Added to Cart | +4 |
| Purchased Product | +5 |

#### Recommendation Flow:
- Calculate total product scores per user
- Return **Top 3–5 Recommended Products**
- Recommendations appear on:
  - Homepage
  - Cart Page
  - Profile Page (optional)

*This AI logic is simple & demo-friendly. Full ML-based recommendations planned for future.*

---

## ✅ Tech Stack (Hackathon Phase)

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), Tailwind CSS |
| State Management | Zustand |
| Backend | Next.js API Routes |
| Database | MongoDB (using Mongoose), or JSON Mock Data |
| AI | Rule-based recommendation engine |
| Deployment | Vercel |

---

## ✅ Backend API Endpoints (Next.js API Routes)

| Area | Endpoint | Method | Description |
|---|---|---|---|
| Auth | `/api/auth/register`, `/api/auth/login` | POST | User registration and login |
| User | `/api/user/onboarding`, `/api/user/profile` | POST/GET | Save onboarding info, fetch profile |
| Products | `/api/products`, `/api/products/:id` | GET | Get all / single products |
| Cart | `/api/cart/update`, `/api/cart/clear` | POST | Update or clear cart |
| Transaction | `/api/transaction/create`, `/api/transaction/history` | POST/GET | Mock checkout and view order history |
| AI | `/api/ai/recommendations` | GET | Fetch recommended products |

---

## ✅ Frontend State Management (Zustand)

- Global state for:
  - User info
  - Cart
  - Search queries
  - AI recommendations

- API consumption using **Fetch API** or **Axios**

---

## ✅  Suggested Demo Flow (For Hackathon Presentation)

- Login / Signup (or Skip)
- Fill Onboarding Form → Get Persona
- See Personalized Homepage (Banners + Recommendations)
- Browse Categories & Search Products
- Add Items to Cart → Simulate Checkout
- View Transaction History
- Experience AI Recommendations throughout

