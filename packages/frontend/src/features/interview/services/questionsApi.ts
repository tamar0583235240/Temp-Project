import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { interviewType } from '../types/questionType'; 

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getQuestions: builder.query<interviewType[], void>({
      query: () => 'questions',
    }),
  }),
});

export const { useGetQuestionsQuery } = questionsApi;
