import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import { interviewMaterialApi } from "../../features/knowledge-base/services/interviewMaterialApi";
import authReducer from '../../features/auth/store/authSlice';
import { authApi } from "../api/authApi";
import userReducer from '../../features/auth/store/userSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
