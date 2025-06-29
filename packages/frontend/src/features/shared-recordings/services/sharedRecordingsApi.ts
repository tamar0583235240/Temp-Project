import { api } from "../../../shared/api/api";
import { SharedRecording } from "../types/types";
import { feedbackType } from "../../feedback/types/feedbackType";

export const sharedRecordingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1. קבלת כל ההקלטות ששויכו למשתמש
    getSharedRecordings: builder.query<SharedRecording[], string>({
      query: (userId) => `/api/shared-recordings/user/${userId}`,
      providesTags: ["SharedRecordings"],
    }),

    // 2. קבלת פרטי הקלטה לפי ID
    getSharedRecordingDetails: builder.query<SharedRecording, string>({
      query: (id) => `/api/shared-recordings/${id}`,
      providesTags: ["SharedRecordings"],
    }),

    // 3. יצירת פידבק
    createFeedback: builder.mutation<feedbackType, Partial<feedbackType> & { answerId: string }>({
      query: ({ answerId, ...body }) => ({
        url: `/api/feedback/${answerId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SharedRecordings"],
    }),

    // 4. עדכון פידבק
    updateFeedback: builder.mutation<feedbackType, { feedbackId: string; comment: string; rating: number }>({
      query: ({ feedbackId, ...body }) => ({
        url: `/api/feedback/${feedbackId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SharedRecordings"],
    }),
  }),
});

export const {
  useGetSharedRecordingsQuery,
  useGetSharedRecordingDetailsQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
} = sharedRecordingsApi;
