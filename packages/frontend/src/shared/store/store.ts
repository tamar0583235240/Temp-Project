// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice'
<<<<<<< HEAD
import simulationSlice from '../../features/interview/store/simulationSlice';


import interviewSlice from "../../features/interview/store/interviewSlice";
=======
import interviewSlice from "../../features/interview/store/buttonsSlice";
import { tipsApi } from "../../features/interview/services/tipsApi";
import shownTipsReducer from '../../features/interview/store/tipsSlice';

>>>>>>> 073ccf05cc991ecf25b86591561f47d7b57a9ca1
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
