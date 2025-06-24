import { api } from "../../../shared/api/api";
import { Question } from "../../recordings/types/Question";

export const AdminQuestionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation<void, Question>({
      query: (question) => ({
      url:"api/questions/addQuestion",
      methodethod: "POST",
      body: question,
      }),
      invalidatesTags: ["question"],
    })

  }),
});

export const {
  useAddQuestionMutation
} = AdminQuestionApi;
