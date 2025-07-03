// shared/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/auth";
import { api } from "../../shared/api/api";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
