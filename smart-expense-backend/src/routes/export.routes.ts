import express from "express";
import { exportTransactionsCSV } from "../controllers/export.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/csv", exportTransactionsCSV);

export default router;
