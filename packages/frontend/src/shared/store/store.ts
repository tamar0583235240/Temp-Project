// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { interviewMaterialSubApi } from '../../features/interview-materials-hub/store/interviewMaterialSubApi';
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [interviewMaterialSubApi.reducerPath]: interviewMaterialSubApi.reducer,

    example: exampleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware,
    interviewMaterialSubApi.middleware
    )

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
