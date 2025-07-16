// shared/api/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
<<<<<<< HEAD
import { ProgressStats } from "../../features/dashboard/types/progress";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // שמור על הכתובת עם /api בסוף
    credentials: 'include', // חשוב להעביר credentials אם משתמשים בעוגיות או session
  }),
  tagTypes: [
    "Item",
    "Feedback",
    "AiInsights",
    "answers",
    "question",
    "shared_recordings",
    "admin",
    "users",
    "DynamicContents"
  ],
  endpoints: (builder) => ({
    getProgressStats: builder.query<ProgressStats, string>({
      query: (userId) => `questions/progress/${userId}`,
    }),
    // אפשר להוסיף כאן עוד endpoints בעתיד
  }),
});

export const { useGetProgressStatsQuery } = api;
=======
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

  }),
  reducerPath: "api",
  tagTypes: ["users", "questions", "answers", "insights"],
  endpoints: () => ({}),
});








>>>>>>> Activity-Monitoring
