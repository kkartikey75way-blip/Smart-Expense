import {
    getStatsRepo,
    getCategoryStatsRepo,
    getMonthlyStatsRepo
} from "../repositories/analytics.repository";

export const getSummaryService = async (userId: string) => {
    const stats = await getStatsRepo(userId);
    return stats[0] || { totalIncome: 0, totalExpense: 0, balance: 0 };
};

export const getCategoryStatsService = async (userId: string, type: string) => {
    return getCategoryStatsRepo(userId, type);
};

export const getMonthlyTrendService = async (userId: string) => {
    return getMonthlyStatsRepo(userId);
};

export const getTopSpendingService = async (userId: string) => {
    // Logic for top spending categories
    const categories = await getCategoryStatsRepo(userId, "expense");
    return categories.slice(0, 5); // Return top 5
};
