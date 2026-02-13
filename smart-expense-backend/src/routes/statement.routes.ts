import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { uploadStatement } from "../controllers/statement.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/upload", protect, upload.single("file"), uploadStatement);

export default router;
