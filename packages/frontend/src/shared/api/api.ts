import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/aiInsightsType";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",
    tagTypes: ["users", "questions", "answers", "insights"],
    endpoints: (builder) => ({
  getProgressStats: builder.query<ProgressStats, string>({
    query: (userId) => `questions/progress/${userId}`,
  }),
}),
});
export const { useGetProgressStatsQuery } = api;