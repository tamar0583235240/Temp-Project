import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";

export const recordingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query<Answer[], void>({
      query: () => "answers",
      providesTags: ["Answer"],
    }),
    uploadAnswer: builder.mutation<Answer, FormData>({
      query: (formData) => ({
        url: "answers/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Answer"],
    }),
    deleteAnswer: builder.mutation<void, string>({
      query: (id) => ({
        url: `answers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Answer"],
    }),
  }),
});

export const {
  useGetAnswersQuery,
  useUploadAnswerMutation,
  useDeleteAnswerMutation,
} = recordingApi;