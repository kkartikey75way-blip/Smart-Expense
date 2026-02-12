import {
    createTransactionRepo,
    getTransactionsRepo,
    countTransactionsRepo,
    findTransactionByIdRepo,
    updateTransactionRepo,
    deleteTransactionRepo
} from "../repositories/transaction.repository";

export const createTransactionService = async (
    userId: string,
    data: any
) => {
    return createTransactionRepo({ ...data, userId });
};

export const getTransactionsService = async (
    userId: string,
    page: number = 1,
    limit: number = 10,
    type?: string,
    category?: string
) => {
    const query: any = { userId };
    if (type) query.type = type;
    if (category) query.category = category;

    const skip = (page - 1) * limit;

    const transactions = await getTransactionsRepo(query, skip, limit);
    const total = await countTransactionsRepo(query);

    return {
        transactions,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const getTransactionByIdService = async (
    id: string,
    userId: string
) => {
    const transaction = await findTransactionByIdRepo(id);
    if (!transaction || transaction.userId.toString() !== userId) {
        throw new Error("Transaction not found or unauthorized");
    }
    return transaction;
};

export const updateTransactionService = async (
    id: string,
    userId: string,
    data: any
) => {
    const transaction = await findTransactionByIdRepo(id);
    if (!transaction || transaction.userId.toString() !== userId) {
        throw new Error("Transaction not found or unauthorized");
    }

    return updateTransactionRepo(id, data);
};

export const deleteTransactionService = async (
    id: string,
    userId: string
) => {
    const transaction = await findTransactionByIdRepo(id);
    if (!transaction || transaction.userId.toString() !== userId) {
        throw new Error("Transaction not found or unauthorized");
    }

    return deleteTransactionRepo(id);
};
