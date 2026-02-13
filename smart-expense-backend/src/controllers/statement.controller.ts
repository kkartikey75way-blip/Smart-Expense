import { Request, Response } from "express";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { Transaction } from "../models/transaction.model";

interface CsvRow {
    Date: string;
    Description: string;
    Amount: string;
}

const autoCategorize = (description: string): string => {
    const text = description.toLowerCase();
    if (text.includes("swiggy") || text.includes("zomato") || text.includes("food") || text.includes("restaurant") || text.includes("kfc") || text.includes("mcdonalds")) return "Food";
    if (text.includes("uber") || text.includes("ola") || text.includes("cab") || text.includes("travel") || text.includes("petrol") || text.includes("fuel")) return "Travel";
    if (text.includes("amazon") || text.includes("flipkart") || text.includes("myntra") || text.includes("shopping") || text.includes("mall")) return "Shopping";
    if (text.includes("netflix") || text.includes("spotify") || text.includes("movie") || text.includes("entertainment") || text.includes("gaming")) return "Entertainment";
    if (text.includes("electricity") || text.includes("water") || text.includes("gas") || text.includes("recharge") || text.includes("bill")) return "Bills";
    if (text.includes("rent") || text.includes("housing") || text.includes("society")) return "Housing";
    if (text.includes("hospital") || text.includes("pharmacy") || text.includes("doctor") || text.includes("medical")) return "Health";
    if (text.includes("school") || text.includes("college") || text.includes("fees") || text.includes("course") || text.includes("udemy")) return "Education";
    return "Others";
};

export const uploadStatement = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = (req as any).user.id;
        const rawRows: CsvRow[] = [];
        const stream = Readable.from(req.file.buffer);

        await new Promise<void>((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on("data", (data: CsvRow) => rawRows.push(data))
                .on("end", resolve)
                .on("error", reject);
        });

        const transactionsToCreate = rawRows.map((row) => {
            const amountNumber = Number(row.Amount);
            const isExpense = amountNumber < 0;

            return {
                userId,
                date: new Date(row.Date),
                description: row.Description,
                amount: Math.abs(amountNumber),
                type: isExpense ? "expense" : "income",
                category: isExpense ? autoCategorize(row.Description) : "Income",
                paymentMethod: "bank",
            };
        });

        const createdTransactions = await Transaction.insertMany(transactionsToCreate);

        return res.status(200).json({
            message: "Statement processed and transactions created successfully",
            totalImported: createdTransactions.length,
            preview: createdTransactions.slice(0, 5),
        });

    } catch (error) {
        console.error("Error processing statement:", error);
        return res.status(500).json({
            message: "Failed to process statement and create transactions",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

