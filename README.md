# 🛒 ShopSculpt.ai - Personalized Walmart Homepage Simulator

---

## 🚀 Overview

**ShopSculpt.ai** is a personalized shopping web application that dynamically adapts the homepage layout, banners, product recommendations, and smart ads based on each user's shopping persona and behavior.  

This project aligns with Walmart’s **Content Decision Platform (CDP)** vision by showcasing how hyper-personalized digital shopping experiences can be delivered through AI-driven insights and user behavioral data.

---

## 🗓️ Hackathon Target

- **Demo Date:** 5th July 2025  
- **Focus for Hackathon:** User-side features with mock AI-based recommendation engine. Admin panel and full database integration are planned for the next phase.

---

## ✅ Full Feature List (Hackathon Scope)

### 👥 User Authentication (Optional)

- Email-based OTP verification for login/register (using mock service or external API like Resend/Firebase).
- Option to skip login for quicker access.

---

### 📝 User Onboarding

- Onboarding form after registration.
- Collect basic user details: Name, Age Group, Shopping Interests.
- Based on form responses, assign a shopping persona (e.g., Budget Shopper, Parent, Vegan).

---

### 🏠 Dynamic Persona-Based Homepage

- Layout, banners, product recommendations, and ads change based on the assigned persona.
- Welcome message personalized for the user.

---

### 📋 Product Categories Page

- Display list of product categories (e.g., Electronics, Grocery, Fashion).
- Clickable categories to show mock products.

---

### 🔍 Search Functionality

- Search box allowing users to type product keywords.
- Filter mock product data based on search term.
- Display relevant search results or a "No Results" message.

---

### 🛒 Shopping Cart

- Add to cart functionality for all products.
- Zustand used for effective global state management of cart items.
- Cart page showing list of items with quantity, price, and total.
- Remove item from cart option.

---

### 💳 Payment Simulation

- Cart summary page before payment.
- Dummy payment form with basic input fields (Card number, CVV, etc. - Optional for hackathon).
- Payment success screen showing order summary.

---

### 👤 User Profile Page

- Display user’s name, email, persona type, and shopping interests.
- Optionally allow user profile editing.

---

### 📄 About Us Page

- Static page with project vision, hackathon goal, and team info.

---

## ✅ AI-Powered Recommendation Engine (Hackathon Scope)

### 📈 User Behavior Tracking:

| Data Point | Tracking Method |
|---|---|
| Purchase History | Log products after each simulated checkout |
| Search History | Store user search queries |
| Product Browsing Time | Track time spent on individual product/category pages |

---

### 🤖 AI Recommendation Logic (For Demo):

A lightweight, rule-based recommendation system using heuristics:

| User Action | Recommendation Weight |
|---|---|
| Viewed Product (for > X seconds) | +2 |
| Searched for product keywords | +3 |
| Added to Cart | +4 |
| Purchased | +5 |

#### Recommendation Flow:
- Calculate a score for each product based on user history.
- Display top 3-5 highest scoring products in a **“Recommended for You”** section on:
  - Homepage
  - Cart page (before checkout)
  - User profile page (optional)

**Note:** This is a mock AI simulation for hackathon. Real ML models can replace this logic post-hackathon.

---

## ✅ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), Tailwind CSS |
| State Management | Zustand |
| Backend (Mock) | Next.js API Routes / Static JSON |
| Database | JSON Mock / Local State for Hackathon |
| Authentication | Mock OTP flow or external API (Firebase/Resend) |
| Deployment | Vercel |

---

## ✅ Hackathon Deliverables (Must-Have for Demo)

| Module | Status |
|---|---|
| Authentication with OTP | Mock or external API |
| Onboarding Form | ✅ |
| Persona-Based Homepage | ✅ |
| Categories Page | ✅ |
| Search Functionality | ✅ |
| Cart | ✅ |
| Payment Simulation | ✅ |
| AI Recommendation Engine | ✅ (Heuristic logic) |
| Deployment | ✅ (Vercel) |

---

## ✅ Stretch Goals (Post Hackathon Phase)

- Full Admin Panel (Product and Persona Management)
- Real Database Integration (PostgreSQL / Firebase)
- ML-based Recommendation Engine
- Real Payment Gateway Integration
- Behavior-driven real-time personalization
- Analytics and Reporting

---

## ✅ Demo Flow (Suggested)

1. Login / Signup (OTP or skip)
2. Fill Onboarding Form → Persona Assignment
3. See Personalized Homepage
4. Browse Categories & Search
5. Add Items to Cart → Simulate Payment
6. See AI-Based Recommendations Throughout

---

## ✅ Closing Note

**ShopSculpt.ai** is built to showcase how e-commerce personalization can be taken to the next level using AI-driven recommendations and persona-based content delivery.

---
