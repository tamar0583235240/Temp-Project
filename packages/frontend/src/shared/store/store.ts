// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import simulationSlice from '../../features/interview/store/simulationSlice';
import interviewSlice from "../../features/interview/store/buttonsSlice";
import { questionsApi } from '../../features/interview/services/questionsApi'; 
import { buttonsApi } from "../../features/interview/services/buttonsApi";
// import { ti } from "../../features/interview/services/tipsApi";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // [tipsApi.reducerPath]: tipsApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [buttonsApi.reducerPath]: buttonsApi.reducer,
    interview: interviewSlice,
    // shownTips: shownTipsReducer,
    example: exampleSlice,
    simulation: simulationSlice, 
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    api.middleware,
    // tipsApi.middleware,
    questionsApi.middleware,
    buttonsApi.middleware 
  ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;









