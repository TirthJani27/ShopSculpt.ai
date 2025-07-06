import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

function extractToken(req: NextRequest) {
  const cookieToken = req.cookies.get("token")?.value;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }
  return undefined;
}

export async function authUser(
  req: NextRequest
): Promise<{ isAuthorized: boolean; user?: InstanceType<typeof User> }> {
  await dbConnect();

  const token = extractToken(req);
  if (!token) {
    return { isAuthorized: false };
  }

  try {
    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET is not defined in environment variables");

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    let userId: string | undefined;

    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      userId = (decoded as jwt.JwtPayload).id as string;
    }

    if (!userId) return { isAuthorized: false };

    const user = await User.findById(userId);
    if (!user) return { isAuthorized: false };

    return { isAuthorized: true, user };
  } catch (error) {
    console.error("User JWT verification failed:", error);
    return { isAuthorized: false };
  }
}

export function middleware(req: NextRequest) {
  const token = extractToken(req);

  const protectedPaths = ["/checkout", "/success"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/success/:path*"],
};