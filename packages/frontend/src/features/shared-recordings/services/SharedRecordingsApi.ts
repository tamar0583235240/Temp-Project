import { api } from "../../../shared/api/api";

export const SharedRecordingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteEmailFromSharedRecording: builder.mutation<void, { sharedRecordingId: string; email: string }>({
      query: ({ sharedRecordingId, email }) => ({
        // /sharedRecordings/:sharedRecordingId/emails/:email
        url: `/sharedRecordings/${sharedRecordingId}/emails/${encodeURIComponent(email)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SharedRecording"],
    }),
  }),
});

export const {
  useDeleteEmailFromSharedRecordingMutation,
} = SharedRecordingsApi;
