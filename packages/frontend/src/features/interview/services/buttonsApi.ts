import { api } from '../../../shared/api/api';
import { interviewType } from '../types/questionType';

export const interviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query<interviewType[], void>({
      query: () => 'simulation',
    }),
  }),
});

export const { useGetAllQuestionsQuery } = interviewApi;
