import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import reminderType from "../../features/reminders/types/reminderType"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",

    }),
    // reducerPath: "api",
    // tagTypes: ["Item"],
    // endpoints: () => ({}),
     tagTypes: ["Reminders"],
  endpoints: (builder) => ({
    getReminders: builder.query<reminderType[], void>({
      query: () => "tips", // יוצר GET ל: /api/tips
      providesTags: ["Reminders"],
    }),
  }),
});


export const { useGetRemindersQuery } = api;
