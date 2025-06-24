// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { resourcesApi } from '../../../shared/api/resourcesApi';

export const store = configureStore({
  reducer: {
    // מוסיפים את reducer של ה-API
    [resourcesApi.reducerPath]: resourcesApi.reducer,
  },
  // מוסיפים את middleware של RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(resourcesApi.middleware),
});
