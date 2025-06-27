/**
 * Root Layout Component
 * Provides global context providers and styling
 */
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../contexts/AuthContext"
import { WishlistProvider } from "../contexts/WishlistContext"
import { CartProvider } from "../contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ShopSculpt - Save Money. Live Better.",
  description: "Shop for Everything You Need at ShopSculpt's Low Prices",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
