// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { interviewMaterialApi } from '../../../shared/api/interviewMaterialApi';

export const store = configureStore({
  reducer: {
    // מוסיפים את reducer של ה-API
    [interviewMaterialApi.reducerPath]: interviewMaterialApi.reducer,
  },
  // מוסיפים את middleware של RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(interviewMaterialApi.middleware),
});
