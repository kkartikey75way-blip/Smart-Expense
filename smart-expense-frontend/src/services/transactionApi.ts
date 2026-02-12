import { api } from "./api";
import { type Transaction } from "../types/transaction";

export const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getTransactions: builder.query<
      { transactions: Transaction[] },
      void
    >({
      query: () => "/transactions",
      providesTags: ["Transactions"]
    }),

    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Transactions"]
    }),

    deleteTransaction: builder.mutation({
      query: (id: string) => ({
        url: `/transactions/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Transactions"]
    })

  })
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation
} = transactionApi;
