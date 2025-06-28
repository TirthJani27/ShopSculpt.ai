import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export interface AuthUser {
  id: string;
  email: string;
}

export function verifyToken(authHeader: string | null): AuthUser | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
}
