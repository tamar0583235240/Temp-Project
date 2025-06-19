// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import simulationSlice from '../../features/interview/store/simulationSlice';
import interviewSlice from "../../features/interview/store/buttonsSlice";
import { tipsApi } from "../../features/interview/services/tipsApi";
import shownTipsReducer from '../../features/interview/store/tipsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [tipsApi.reducerPath]: tipsApi.reducer,
    example: exampleSlice,
    simulation: simulationSlice, 
    interview: interviewSlice,
    shownTips: shownTipsReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
        .concat(tipsApi.middleware), 

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
