import { api } from "../../../shared/api/api";
import { Question } from "../types/Question";

export const AdminQuestionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuestions: builder.query<Question[], void>({
            query: () => 'question/getAllQuestions',
            providesTags: ['question'],
        }),  
        updateQuestionById: builder.mutation<Question, { id: string; data: Partial<Question> }>({
            query: ({ id, data }) => ({
              url: `question/updateQuestion/${id}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['question'],
          }),   
    }),
});



export const { useGetAllQuestionsQuery,useUpdateQuestionByIdMutation } = AdminQuestionApi;