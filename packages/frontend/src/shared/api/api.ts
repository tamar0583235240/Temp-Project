// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import reminderType from "../../features/reminders/types/tipType"

export const api = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", 
  }),
  tagTypes: ["Reminders"],

  endpoints: (builder) => ({
    
    getReminders: builder.query<reminderType[], void>({
      query: () => "tips",
      providesTags: ["Reminders"],
    }),

    saveUserReminderSettings: builder.mutation<
      void,
      {
        userId: string;
        settings: Record<string, string>;
      }
    >({
      query: ({ userId, settings }) => ({
        url: "reminders/settings", 
        method: "POST",
        body: { userId, settings },
      }),
      invalidatesTags: ["Reminders"], 
    }),
  }),
});

export const {
  useGetRemindersQuery,
  useSaveUserReminderSettingsMutation,
} = api;
