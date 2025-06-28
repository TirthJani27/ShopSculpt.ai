import { NextRequest, NextResponse } from "next/server";
import { authUser } from "@/lib/middleware"; // Assuming your auth helper path
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import Product from "@/models/product.model";
import Transaction from "@/models/transaction.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { isAuthorized, user } = await authUser(req);

    if (!isAuthorized || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fullUser = await User.findOne({ _id: user._id })
      .populate({
        path: "favorites",
        model: Product,
      })
      .populate({
        path: "transactionHistory",
        model: Transaction,
      })
      .lean();

    if (!fullUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userObj = Array.isArray(fullUser) ? fullUser[0] : fullUser;

    const responseData = {
      id: userObj?._id,
      searchHistory: userObj?.searchHistory,
      favorites: userObj?.favorites,
      transactionHistory: userObj?.transactionHistory,
    };

    return NextResponse.json(
      { success: true, data: responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch user history failed:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
