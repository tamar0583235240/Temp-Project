// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { personalProjectsApi } from '../../../shared/api/projectApi';

export const store = configureStore({
  reducer: {
    // מוסיפים את reducer של ה-API
    [personalProjectsApi.reducerPath]: personalProjectsApi.reducer,
  },
  // מוסיפים את middleware של RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(personalProjectsApi.middleware),
});