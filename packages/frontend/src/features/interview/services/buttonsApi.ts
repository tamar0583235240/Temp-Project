import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../../../shared/api/api';
import { interviewType } from '../types/questionType';

export const buttonsApi = createApi({
  reducerPath: 'buttonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<interviewType[], void>({
      query: () => 'questions',
    }),
  }),
});

// export const interviewApi = api.injectEndpoints({
  
//   endpoints: (builder) => ({
//     getAllQuestions: builder.query<interviewType[], void>({
//       query: () => 'simulation',
//     }),
//   }),
// });

export const { useGetAllQuestionsQuery } = buttonsApi;
