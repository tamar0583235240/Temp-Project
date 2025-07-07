import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
import { remindersApi } from "../../features/reminders/services/remindersApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [remindersApi.reducerPath]: remindersApi.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    remindersApi.middleware,
    getDefaultMiddleware().concat(api.middleware) ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
