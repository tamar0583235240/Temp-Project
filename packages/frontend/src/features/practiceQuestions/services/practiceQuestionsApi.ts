import { api } from "../../../shared/api/api";
import {
  PracticeQuestion,
  PracticeQuestionRequestType,
  Topic,
} from "../types/practiceQuestionTypes";

export const practiceQuestionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPracticeQuestions: builder.query<PracticeQuestion[], void>({
      query: () => "api/practiceQuestions",
      providesTags: ["PracticeQuestion"],
    }),
    getPracticeQuestionsByTopic: builder.query<PracticeQuestion[], string>({
      query: (topicId) => `api/practiceQuestions/topic/${topicId}`,
      providesTags: ["PracticeQuestion"],
    }),
    addPracticeQuestion: builder.mutation<PracticeQuestion, PracticeQuestionRequestType>({
      query: (newQuestion) => ({
        url: "api/practiceQuestions",
        method: "POST",
        body: newQuestion,
      }),
      invalidatesTags: ["PracticeQuestion"],
    }),
    editPracticeQuestion: builder.mutation<PracticeQuestion, PracticeQuestionRequestType>({
      query: (editQuestion) => ({
        url: "api/practiceQuestions/${editQuestion.id}",
        method: "put",
        body: editQuestion,
      }),
      invalidatesTags: ["PracticeQuestion"],
    }),
    getTopics: builder.query<Topic[], void>({
      query: () => "api/practiceQuestions/topics",
      providesTags: ["Topics"],
    }),
  }),
});

export const {
  useGetPracticeQuestionsQuery,
  useAddPracticeQuestionMutation,
  useEditPracticeQuestionMutation,
  useGetTopicsQuery,
  useGetPracticeQuestionsByTopicQuery

} = practiceQuestionsApi;


