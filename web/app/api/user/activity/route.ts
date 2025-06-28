import { authUser } from "@/lib/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = (await authUser(req)).user;
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = {
      id: user._id,
      interestCategory: user.interestCategory,
      gender: user.gender,
      persona: user.persona,
    };
    return NextResponse.json(
      {
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
