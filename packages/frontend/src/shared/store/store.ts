// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import simulationSlice from '../../features/interview/store/simulationSlice';
import { questionsApi } from '../../features/interview/services/questionsApi'; 
import recordingSlice from '../../features/recordings/store/recordingSlice'
import { categoriesApi } from "../../features/interview/services/categoriesApi";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    example: exampleSlice,
    simulation: simulationSlice, 
    recording: recordingSlice,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    api.middleware,
    // tipsApi.middleware,
    questionsApi.middleware,
    categoriesApi.middleware
  ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;









