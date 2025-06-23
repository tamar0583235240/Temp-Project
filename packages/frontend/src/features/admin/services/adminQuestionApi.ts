import { api } from "../../../shared/api/api";
import { Question } from "../types/Question";

export const AdminQuestionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuestions: builder.query<Question[], void>({
            query: () => 'question/getAllQuestions',
            providesTags: ['question'],
        }),     
    }),
});

export const { useGetAllQuestionsQuery } = AdminQuestionApi;