// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { questionsApi } from '../services/questionsApi';
import { categoriesApi } from '../services/categoriesApi';

export const store = configureStore({
  reducer: {
    [questionsApi.reducerPath]: questionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      questionsApi.middleware,
      categoriesApi.middleware
    ),
});

console.log("✅ Store is using both middlewares!");

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
