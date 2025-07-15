import { api } from "../../../shared/api/api";
import { CreatePracticeQuestionRequest, PracticeQuestion } from "../types/practiceQuestionsType";


export const practiceQuestionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPracticeQuestions: builder.query<PracticeQuestion[], void>({
      query: () => "api/practiceQuestions",
      providesTags: ["PracticeQuestion"],
    }),
    addPracticeQuestion: builder.mutation<PracticeQuestion, CreatePracticeQuestionRequest>({
      query: (newQuestion) => ({
        url: "api/practiceQuestions",
        method: "POST",
        body: newQuestion,
      }),
      invalidatesTags: ["PracticeQuestion"],
    }),
  }),
});

export const {
  useGetPracticeQuestionsQuery,
  useAddPracticeQuestionMutation,
} = practiceQuestionsApi;