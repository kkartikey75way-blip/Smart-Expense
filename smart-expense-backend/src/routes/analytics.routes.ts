import express from "express";
import {
    getDashboardStats,
    getCategoryStats,
    getMonthlyStats
} from "../controllers/analytics.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/dashboard", getDashboardStats);
router.get("/categories", getCategoryStats);
router.get("/monthly", getMonthlyStats);

export default router;
