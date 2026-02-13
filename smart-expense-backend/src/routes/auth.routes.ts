import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  getProfile
} from "../controllers/auth.controller";

import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/me", protect, getProfile);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", protect, logout);

export default router;
