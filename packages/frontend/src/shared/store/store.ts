import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import userReducer from '../../features/auth/store/userSlice';
import { userApi } from "../api/user.api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,  // <--- add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
