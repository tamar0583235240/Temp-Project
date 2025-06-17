// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import interviewSlice from "../../features/interview/store/interviewSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    example: exampleSlice,
    interview: interviewSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
