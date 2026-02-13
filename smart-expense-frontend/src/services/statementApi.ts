import { api } from "./api";

export const statementApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadStatement: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: "/statement/upload",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Transactions"],
        }),
    }),
});

export const { useUploadStatementMutation } = statementApi;
