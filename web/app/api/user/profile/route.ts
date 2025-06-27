import express from "express";
import { authenticateToken, AuthRequest } from "../../../../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", authenticateToken, (req: AuthRequest, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

export default router;
