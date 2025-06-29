// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {reminderType} from "../../features/reminders/types/reminderType"

// export const api = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:5000/",

//     }),
//     // reducerPath: "api",
//     // tagTypes: ["Item"],
//     // endpoints: () => ({}),
//      tagTypes: ["Reminders"],
//   endpoints: (builder) => ({
//     getReminders: builder.query<reminderType[], void>({
//       query: () => "tips",// יוצר GET ל: /api/tips 
//       providesTags: ["Reminders"],
//     }),
//     saveUserReminderSettings: builder.mutation<void, { userId: string; settings: { userId: string; settings: Record<string, string> }
//  }>({
//       query: ({ userId, settings }) => ({
//         url: `api/reminders/settings`,
//         method: "POST",
//         body: { userId, settings },
//       }),
//       invalidatesTags: ["Reminders"], // מבטל את התגית Reminders כדי לרענן את הנתונים
//   }),
// })
// });



// export const { useGetRemindersQuery,useSaveUserReminderSettingsMutation } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  {reminderType}  from "../../features/reminders/types/reminderType";

// יצירת API
export const api = createApi({
  reducerPath: "api", // שם ברירת מחדל ברידוסר
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", // הקפד ששרתך מאזין עם /api
  }),
  tagTypes: ["Reminders"],

  endpoints: (builder) => ({
    // קריאה לנתיב GET /api/tips
    getReminders: builder.query<reminderType[], void>({
      query: () => "tips",
      providesTags: ["Reminders"],
    }),

    // שליחת הגדרות תזכורות למשתמש
    saveUserReminderSettings: builder.mutation<
      void,
      {
        userId: string;
        settings: Record<string, string>;
      }
    >({
      query: ({ userId, settings }) => ({
        url: "reminders/settings", // יוצר POST ל: /api/reminders/settings
        method: "POST",
        body: { userId, settings },
      }),
      invalidatesTags: ["Reminders"], // רענון של הנתונים
    }),
  }),
});

// ייצוא ה-hooks האוטומטיים
export const {
  useGetRemindersQuery,
  useSaveUserReminderSettingsMutation,
} = api;
