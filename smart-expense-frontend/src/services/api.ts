import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "../store/store";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Transactions"],

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),

    endpoints: () => ({})
});
