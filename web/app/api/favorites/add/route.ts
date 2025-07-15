import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import Product from "@/models/product.model"; // Assuming you have a Product model
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

    // Optional: Verify product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if product is already in favorites
    const isAlreadyFavorited = user.favorites.some(
      (favId: any) => favId.toString() === productId
    );

    if (isAlreadyFavorited) {
      return NextResponse.json(
        {
          success: false,
          message: "Product is already in favorites",
          favorites: user.favorites,
        },
        { status: 200 }
      );
    }

    // Add to favorites using atomic operation
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { favorites: productId } }, // $addToSet prevents duplicates
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
        message: "Product added to favorites successfully",
        favorites: updatedUser.favorites,
        favoritesCount: updatedUser.favorites.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add to favorites error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to fetch user's favorites
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { isAuthorized, user } = await authUser(req);
    if (!isAuthorized || !user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Populate favorites with product details (optional)
    const userWithFavorites = await User.findById(user._id)
      .populate("favorites", "name price image description") // Adjust fields as needed
      .select("favorites");

    return NextResponse.json(
      {
        success: true,
        favorites: userWithFavorites?.favorites || [],
        favoritesCount: userWithFavorites?.favorites?.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get favorites error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
