import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { userRegisterSchema } from "@/lib/schemas/user.schema";
import connectToDB from "@/lib/dbConnect";
import mongooseUser from "@/models/user.model";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const parsed = userRegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { fullname, email, password } = parsed.data;

    const existingUser = await mongooseUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new mongooseUser({
      email,
      password: passwordHash,
      fullname,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      { token, message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
