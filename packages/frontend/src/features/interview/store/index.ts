import { configureStore } from '@reduxjs/toolkit'
import { tipsApi } from '../services/tipsApi'

export const store = configureStore({
  reducer: {
    [tipsApi.reducerPath]: tipsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tipsApi.middleware),
})
