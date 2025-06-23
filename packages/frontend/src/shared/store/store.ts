// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import simulationSlice from '../../features/interview/store/simulationSlice';
import interviewSlice from "../../features/interview/store/buttonsSlice";
import { questionsApi } from '../../features/interview/services/questionsApi';
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    example: exampleSlice,
    simulation: simulationSlice,
    [questionsApi.reducerPath]: questionsApi.reducer,
    interview: interviewSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    api.middleware,
    questionsApi.middleware
  ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;









