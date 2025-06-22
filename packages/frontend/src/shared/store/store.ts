import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import authReducer from '../../features/auth/store/authSlice';
<<<<<<< HEAD
import { authApi } from "../api/authApi";
import userReducer from '../../features/auth/store/userSlice';
=======
>>>>>>> 6b93a9b (front end and finishes)

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware) ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
