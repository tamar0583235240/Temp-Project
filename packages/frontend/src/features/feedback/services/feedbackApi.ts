import { api } from "../../../shared/api/api";
import { feedbackType } from "../types/feedbackType";

export const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // כרגע את לא משתמשת בזה בפועל — רק אם תציגי פידבקים של אחרים
    getFeedbacksBySharedRecordingId: builder.query<feedbackType[], string>({
      query: (sharedRecordingId) =>
        `/feedbackes/getFeedbackesByanswerId/${sharedRecordingId}`, // ודאי שזה נכון בשרת
      providesTags: ["Feedback"],
    }),

    // יצירת פידבק חדש
    createFeedback: builder.mutation<void, {
      sharedRecordingId: string;
      givenByUserId: string;
      comment: string;
      rating: number;
    }>({
      query: (body) => ({
        url: '/shared-recordings/feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["Feedback", "SharedRecordings"],
    }),

    // עדכון פידבק קיים
    updateFeedback: builder.mutation<void, {
      id: string;
      comment: string;
      rating: number;
    }>({
      query: ({ id, ...body }) => ({
        url: `/shared-recordings/feedback/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ["Feedback", "SharedRecordings"],
    }),
  }),
});

export const {
  useGetFeedbacksBySharedRecordingIdQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
} = feedbackApi;
