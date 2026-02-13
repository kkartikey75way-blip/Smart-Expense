import { Parser } from "json2csv";
import { getAllTransactionsByUserIdRepo } from "../repositories/transaction.repository";

export const exportToCSVService = async (userId: string) => {
    const transactions = await getAllTransactionsByUserIdRepo(userId);

    if (!transactions || transactions.length === 0) {
        throw new Error("No transactions found to export");
    }

    const fields = [
        { label: "Date", value: (row: any) => new Date(row.date).toLocaleDateString() },
        { label: "Type", value: "type" },
        { label: "Category", value: "category" },
        { label: "Amount", value: "amount" },
        { label: "Payment Method", value: "paymentMethod" },
        { label: "Description", value: "description" },
        { label: "Tags", value: (row: any) => row.tags.join(", ") }
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);

    return csv;
};
