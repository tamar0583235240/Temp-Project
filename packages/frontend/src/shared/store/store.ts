// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import simulationSlice from '../../features/interview/store/slices/simulationSlice';


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    example: exampleSlice,
    simulation: simulationSlice, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
