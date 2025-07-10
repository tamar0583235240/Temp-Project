<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../../../shared/api/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    // כאן תוכלי להוסיף reducers נוספים אם יש:
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

// טיפוסים ל-useSelector ו-useDispatch בפרויקט שלך
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
=======
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../../../shared/api/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
