import { NextRequest, NextResponse } from "next/server";
import { userUpdateSchema } from "@/lib/schemas/user.schema";
import { authUser } from "@/lib/middleware";
import dbConnect from "@/lib/dbConnect";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = userUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error.flatten().fieldErrors);

      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const session = await authUser(req);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    await dbConnect();
    const user = session.user;
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { dob, gender, phone, region, state, pincode } = parseResult.data;

    user.dob = dob;
    user.gender = gender;
    user.phone = phone;
    user.region = region;
    user.state = state;
    user.pincode = pincode;

    await user.save();

    return NextResponse.json(
      { message: "User info updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("[UPDATE_USER_INFO]", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
