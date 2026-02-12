import { Transaction } from "../models/transaction.model";
import mongoose from "mongoose";

export const getStatsRepo = async (userId: string) => {
    const uid = new mongoose.Types.ObjectId(userId);
    return Transaction.aggregate([
        { $match: { userId: uid } },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                balance: { $subtract: ["$totalIncome", "$totalExpense"] }
            }
        }
    ]);
};

export const getCategoryStatsRepo = async (userId: string, type: string) => {
    const uid = new mongoose.Types.ObjectId(userId);
    return Transaction.aggregate([
        { $match: { userId: uid, type: type } },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },
        { $sort: { total: -1 } }
    ]);
};

export const getMonthlyStatsRepo = async (userId: string) => {
    const uid = new mongoose.Types.ObjectId(userId);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return Transaction.aggregate([
        {
            $match: {
                userId: uid,
                date: { $gte: sixMonthsAgo }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" },
                    type: "$type"
                },
                total: { $sum: "$amount" }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
};
