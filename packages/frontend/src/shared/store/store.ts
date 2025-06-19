// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
import { tipsApi } from "../../features/interview/services/tipsApi";
import shownTipsReducer from '../../features/interview/store/tipsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [tipsApi.reducerPath]: tipsApi.reducer,
    example: exampleSlice,
    shownTips: shownTipsReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
        .concat(tipsApi.middleware), 

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
