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
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const remindersApi = createApi({
  reducerPath: 'remindersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/reminders' }),
  endpoints: (builder) => ({
    saveUserReminderSettings: builder.mutation<void, {
      userId: string;
      settings: { type: string; frequency: string }[];
    }>({
      query: (body) => ({
        url: '/settings',
        method: 'POST',
        body,
      }),
    }),
    getUserReminders: builder.query<any[], string>({
      query: (userId) => `/${userId}`,
    }),
  }),
});

export const {
  useSaveUserReminderSettingsMutation,
  useGetUserRemindersQuery,
} = remindersApi;
