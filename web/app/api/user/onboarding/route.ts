import { NextRequest, NextResponse } from "next/server";
import { userOnboardingSchema } from "@/lib/schemas/user.schema";
import { authUser } from "@/lib/middleware";
import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = userOnboardingSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parseResult.error.errors },
        { status: 400 }
      );
    }
    const isAuthorized = await authUser(req);
    if (!isAuthorized || !isAuthorized.isAuthorized) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
    await dbConnect();
    const user = isAuthorized.user;
    const {
      age,
      gender,
      region,
      interestCategory,
      persona,
      priceRange,
      shoppingFrequency,
    } = parseResult.data;
    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
    currentUser.age = age;
    currentUser.gender = gender;
    currentUser.region = region;
    currentUser.interestCategory = interestCategory;
    currentUser.persona = persona;
    currentUser.priceRange = priceRange;
    currentUser.shoppingFrequency = shoppingFrequency;
    await currentUser.save();
    return NextResponse.json(
      { message: "User onboarding data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
