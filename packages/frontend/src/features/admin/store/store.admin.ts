import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { adminApi } from "../../../shared/api/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
=======
import { adminApi } from "../services/adminApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer, 
>>>>>>> Activity-Monitoring
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

<<<<<<< HEAD
// טיפוסים ל-useSelector ו-useDispatch בפרויקט שלך
=======
>>>>>>> Activity-Monitoring
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
