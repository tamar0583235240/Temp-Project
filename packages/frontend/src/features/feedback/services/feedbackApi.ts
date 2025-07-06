import { api } from "../../../shared/api/api";
import { feedbackType } from "../types/feedbackType";

export const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacksBySharedRecordingId: builder.query<feedbackType[], string>({
      query: (sharedRecordingId) =>
        `/feedbackes/getFeedbackesByanswerId/${sharedRecordingId}`,
      providesTags: ["Feedback"],
    }),

    createFeedback: builder.mutation<void, {
      shared_recording_id: string;
      given_by_user_id: string;
      comment: string;
      rating: number;
    }>({
      query: (body) => ({
        url: '/feedbackes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Feedback", "SharedRecordings"],
    }),
  }),
});

export const {
  useGetFeedbacksBySharedRecordingIdQuery,
  useCreateFeedbackMutation,
} = feedbackApi;
