import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";
import analyticsRoutes from "./routes/analytics.routes";
import exportRoutes from "./routes/export.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/export", exportRoutes);

export default app;
