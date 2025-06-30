/**
 * Empty State Component
 * Reusable component for displaying empty states in profile sections
 * Used for empty cart, wishlist, and orders
 */
"use client"
import Link from "next/link"

export default function EmptyState({ icon: Icon, title, description, actionText, actionLink, actionIcon: ActionIcon }) {
  return (
    <div className="text-center py-12">
      <Icon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      {actionText && actionLink && (
        <Link
          href={actionLink}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
        >
          {ActionIcon && <ActionIcon className="w-5 h-5" />}
          <span>{actionText}</span>
        </Link>
      )}
    </div>
  )
}
