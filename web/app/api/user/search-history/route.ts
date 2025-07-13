import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { authUser } from "@/lib/middleware";

export async function POST(req: NextRequest) {
  try {
    const isAuthorized = await authUser(req);
    if (!isAuthorized || !isAuthorized.isAuthorized) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
    const user = isAuthorized.user;
    const { keyword } = await req.json();
    if (!keyword || keyword.trim() === "") {
      return NextResponse.json({ error: "Keyword required" }, { status: 400 });
    }

    await dbConnect();

    const userId = user._id;

    // Remove duplicate first
    await User.findByIdAndUpdate(userId, {
      $pull: { searchHistory: { keyword } },
    });

    // Then push the new one and limit to 5
    await User.findByIdAndUpdate(userId, {
      $push: {
        searchHistory: {
          $each: [{ keyword, searchedAt: new Date() }],
          $sort: { searchedAt: -1 },
          $slice: 5,
        },
      },
    });

    return NextResponse.json({ message: "Search keyword added" });
  } catch (err) {
    console.error("Search history error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
