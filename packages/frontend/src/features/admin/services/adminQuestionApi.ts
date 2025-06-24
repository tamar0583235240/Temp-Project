import { api } from "../../../shared/api/api";
import { Question } from "../../recordings/types/Question";

export const AdminQuestionApi = api.injectEndpoints({
  
  endpoints: (builder) => ({
    addQuestion: builder.mutation<void, Question>({
      query: (question) => ({
      url:"api/questions/addQuestion",
      method: "POST",
      body: question,
      }),
      invalidatesTags: ["question"],
    }), 
    getAllQuestions: builder.query<Question[], void>({
            query: () => 'question/getAllQuestions',
            providesTags: ['question'],
        }),    

  }),
});

export const {
  useAddQuestionMutation , useGetAllQuestionsQuery
} = AdminQuestionApi;




