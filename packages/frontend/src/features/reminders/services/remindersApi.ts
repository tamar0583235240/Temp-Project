// // shared/api/api.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import reminderType from '../types/tipType';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
//   tagTypes: ['Reminders'],
//   endpoints: (builder) => ({
//     getReminders: builder.query<reminderType[], void>({
//       query: () => '/tips',
//       providesTags: ['Reminders'],
//     }),
//   }),
// });

// export const { useGetRemindersQuery } = api;

// shared/api/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import reminderType from '../types/tipType';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Reminders'],
  endpoints: (builder) => ({
    getReminders: builder.query<reminderType[], string>({
      // כאן אנחנו מעבירים את ה-userId כארגומנט
      // query: (userId) => `/tips/${userId}`,  // הכנס את ה-userId ב-URL
      query: () => `/tips/`,  
      providesTags: ['Reminders'],
    }),
  }),
});

export const { useGetRemindersQuery } = api;
