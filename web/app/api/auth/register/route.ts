import express from "express";
import bcrypt from "bcrypt";
import { userRegisterSchema } from "../../../../lib/schemas/user.schema";
import { User } from "../../../../models/user.model";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const parsed = userRegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  const { fullname, email, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, passwordHash });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;