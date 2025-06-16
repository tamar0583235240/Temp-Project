// shared/api/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/progress";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["User", "Item", "Progress"],
  endpoints: (builder) => ({
    getProgressStats: builder.query<ProgressStats, string>({
      query: (userId) => `questions/progress/${userId}`,
    }),
  }),
});

export const { useGetProgressStatsQuery } = api;
