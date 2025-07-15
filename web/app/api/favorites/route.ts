import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { authUser } from "@/lib/middleware";
import { isValidObjectId } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Authenticate user
    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Validate productId format (if using MongoDB ObjectId)
    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    // Check if product is in favorites
    const isInFavorites = user.favorites.some(
      (favId: any) => favId.toString() === productId
    );

    if (!isInFavorites) {
      return NextResponse.json(
        {
          success: false,
          message: "Product is not in favorites",
          favorites: user.favorites,
        },
        { status: 200 }
      );
    }

    // Remove from favorites using atomic operation
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { favorites: productId } }, // $pull removes the item
      { new: true, runValidators: true }
    ).select("favorites"); // Only return favorites field for efficiency

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user favorites" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product removed from favorites successfully",
        favorites: updatedUser.favorites,
        favoritesCount: updatedUser.favorites.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Remove from favorites error:", error);

    // Handle specific error types
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE method as alternative
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { favorites: productId } },
      { new: true, runValidators: true }
    ).select("favorites");

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user favorites" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product removed from favorites successfully",
        favorites: updatedUser.favorites,
        favoritesCount: updatedUser.favorites.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Remove from favorites error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
