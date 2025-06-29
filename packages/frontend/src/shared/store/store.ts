
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import exampleSlice from '../../features/exampleFeatures/store/exampleSlice';
import authReducer from '../../features/auth/store/authSlice';
import { sharedRecordingReducer } from '../../features/shared-recordings/store/sharedRecordingSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    example: exampleSlice,
    auth: authReducer,
    sharedRecording: sharedRecordingReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
