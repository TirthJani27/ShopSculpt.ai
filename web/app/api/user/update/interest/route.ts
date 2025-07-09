import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { authUser } from "@/lib/middleware";
import { interestUpdateSchema } from "@/lib/schemas/user.schema";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = interestUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parsed.error.errors },
        { status: 400 }
      );
    }

    const session = await authUser(req);
    if (!session?.isAuthorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user._id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.interestCategory = parsed.data.interestCategory;
    await user.save();

    return NextResponse.json(
      { message: "Interest categories updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update interest error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
