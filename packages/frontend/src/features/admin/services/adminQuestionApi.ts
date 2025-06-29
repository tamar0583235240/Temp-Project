import { api } from "../../../shared/api/api";
import { Question } from "../types/Question";

export const AdminQuestionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuestions: builder.query<Question[], void>({
            query: () => 'question/getAllQuestions',
            providesTags: ['question'],
        }),
        // updateQuestionById: builder.mutation<Question, { data: Partial<Question> }>({
        //     query: (data) => ({
        //         url: `question/updateQuestion`,
        //         method: 'PUT',
        //         body: data,
        //     }),
        //     invalidatesTags: ['question'],
        // }),
        updateQuestion: builder.mutation<Question, Partial<Question>>({
            query: (data) => ({
                url: `question/updateQuestion`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["question"],
        }),
        deleteQuestionById: builder.mutation<string, string>({
            query: (id) => ({
                url: `question/deleteQuestionById/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['question'],
        }),
    }),
});

export const { useGetAllQuestionsQuery, useDeleteQuestionByIdMutation, useUpdateQuestionMutation } = AdminQuestionApi;