import { Request, Response } from "express";
import {
    createTransactionService,
    getTransactionsService,
    updateTransactionService,
    deleteTransactionService
} from "../services/transaction.service";

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const transaction = await createTransactionService(userId, req.body);
        res.status(201).json(transaction);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { page, limit, type, category } = req.query;

        const result = await getTransactionsService(
            userId,
            Number(page) || 1,
            Number(limit) || 10,
            type as string,
            category as string
        );

        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const id = req.params.id as string;
        const transaction = await updateTransactionService(id, userId, req.body);
        res.json(transaction);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const id = req.params.id as string;
        await deleteTransactionService(id, userId);
        res.json({ message: "Transaction deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
