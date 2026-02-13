import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "./reducer/authReducer";
import uiReducer from "./reducer/uiReducer";

export const store = configureStore({
        reducer: {
                auth: authReducer,
                ui: uiReducer,
                [api.reducerPath]: api.reducer
        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
