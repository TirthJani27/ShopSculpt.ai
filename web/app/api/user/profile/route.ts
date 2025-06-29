import { authUser } from "@/lib/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const isAuthorized = await authUser(req);
    if (!isAuthorized || !isAuthorized.isAuthorized) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
    const user = isAuthorized.user;
    return NextResponse.json(
      {
        user,
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
