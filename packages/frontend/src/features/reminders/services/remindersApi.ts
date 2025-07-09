// // // // shared/api/api.ts
// // // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // // import reminderType from '../types/tipType';

// // // export const api = createApi({
// // //   reducerPath: 'api',
// // //   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
// // //   tagTypes: ['Reminders'],
// // //   endpoints: (builder) => ({
// // //     getReminders: builder.query<reminderType[], void>({
// // //       query: () => '/tips',
// // //       providesTags: ['Reminders'],
// // //     }),
// // //   }),
// // // });

// // // export const { useGetRemindersQuery } = api;

// // // shared/api/api.ts
// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import reminderType from '../types/tipType';

// // export const api = createApi({
// //   reducerPath: 'api',
// //   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
// //   tagTypes: ['Reminders'],
// //   endpoints: (builder) => ({
// //     getReminders: builder.query<reminderType[], string>({
// //       // כאן אנחנו מעבירים את ה-userId כארגומנט
// //       // query: (userId) => `/tips/${userId}`,  // הכנס את ה-userId ב-URL
// //       query: () => `/tips/`,  
// //       providesTags: ['Reminders'],
// //     }),
// //   }),
// // });

// // export const { useGetRemindersQuery } = api;

// // remindersApi.ts
// // remindersApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import reminderType from '../types/tipType';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
//   tagTypes: ['Reminders'],
//   endpoints: (builder) => ({
//     getSentTips: builder.query<reminderType[], void>({
//       query: () => '/tips',
//       providesTags: ['Reminders'],
//     }),
//   }),
// });

// export const { useGetSentTipsQuery } = api;
// remindersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import reminderType from '../types/tipType';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Reminders'],
  endpoints: (builder) => ({
    // שינוי השם מ-getSentTips ל-getReminders
    getReminders: builder.query<reminderType[], void>({
      query: () => '/reminders', // שים את הנתיב הנכון אם צריך
      providesTags: ['Reminders'],
    }),
    sendDueReminders: builder.mutation<void, void>({
      query: () => ({
        url: '/reminders/send', // הנתיב לשליחת התזכורות
        method: 'POST',
      }),
      invalidatesTags: ['Reminders'],
    }),
  }),
});

// הוספת הפונקציות כך שיהיה ניתן להשתמש בהן ב-Frontend
export const { useGetRemindersQuery, useSendDueRemindersMutation } = api;
