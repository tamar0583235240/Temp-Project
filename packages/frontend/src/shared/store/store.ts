<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import authReducer from '../../features/auth/store/authSlice';
import userReducer from '../../features/auth/store/userSlice';
=======
// shared/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/store/auth";
import { api } from "../../shared/api/api";

>>>>>>> Activity-Monitoring

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
<<<<<<< HEAD
    user: userReducer,
    auth: authReducer,
=======

>>>>>>> Activity-Monitoring
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
