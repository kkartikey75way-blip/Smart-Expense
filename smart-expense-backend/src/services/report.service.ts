import { Transaction } from "../models/transaction.model";
import { Parser } from "json2csv";

export const generateCSVReportService = async (userId: string) => {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    const fields = [
        "type",
        "amount",
        "category",
        "description",
        "paymentMethod",
        "date"
    ];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(transactions);

    return csv;
};

export const generatePDFReportService = async (userId: string) => {
    // Placeholder for PDF generation
    // Often depends on libraries like pdfmake or puppeteer
    throw new Error("PDF Report generation not implemented yet. Please install a PDF library.");
};
