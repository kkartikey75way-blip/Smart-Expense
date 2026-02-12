import { Request, Response } from "express";
import {
    getStatsRepo,
    getCategoryStatsRepo,
    getMonthlyStatsRepo
} from "../repositories/analytics.repository";

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const stats = await getStatsRepo(userId);
        res.json(stats[0] || { totalIncome: 0, totalExpense: 0, balance: 0 });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategoryStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { type } = req.query;

        if (!type || (type !== "income" && type !== "expense")) {
            return res.status(400).json({ message: "Invalid type" });
        }

        const stats = await getCategoryStatsRepo(userId, type as string);
        res.json(stats);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getMonthlyStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const stats = await getMonthlyStatsRepo(userId);
        res.json(stats);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
