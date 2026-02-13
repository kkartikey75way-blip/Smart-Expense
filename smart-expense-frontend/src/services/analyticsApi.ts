import { api } from "./api";

export const analyticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<{ totalIncome: number; totalExpense: number; balance: number }, void>({
            query: () => "/analytics/dashboard",
            providesTags: ["Transactions"]
        }),
        getCategoryStats: builder.query<any[], "income" | "expense">({
            query: (type) => `/analytics/categories?type=${type}`,
            providesTags: ["Transactions"]
        }),
        getMonthlyStats: builder.query<any[], void>({
            query: () => "/analytics/monthly",
            providesTags: ["Transactions"]
        })
    })
});

export const {
    useGetDashboardStatsQuery,
    useGetCategoryStatsQuery,
    useGetMonthlyStatsQuery
} = analyticsApi;
