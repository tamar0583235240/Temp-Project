import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../../shared/api/api";
import { adminApi } from "../services/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,  // רק adminApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
