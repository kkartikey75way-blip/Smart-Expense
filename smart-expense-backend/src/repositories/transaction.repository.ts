import { Transaction } from "../models/transaction.model";

export const createTransactionRepo = async (data: any) => {
  return Transaction.create(data);
};

export const getTransactionsRepo = async (
  query: any,
  skip: number,
  limit: number
) => {
  return Transaction.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
};

export const countTransactionsRepo = async (query: any) => {
  return Transaction.countDocuments(query);
};

export const findTransactionByIdRepo = async (id: string) => {
  return Transaction.findById(id);
};

export const updateTransactionRepo = async (
  id: string,
  data: any
) => {
  return Transaction.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTransactionRepo = async (id: string) => {
  return Transaction.findByIdAndDelete(id);
};
