import { Request, Response } from "express";
import { exportToCSVService } from "../services/export.service";

export const exportTransactionsCSV = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const csv = await exportToCSVService(userId);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=transactions_${Date.now()}.csv`
        );
        res.status(200).send(csv);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
