import { api } from "../../../shared/api/api";
import { Participant } from "../types/Participant";

export const ShareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSharedWith: builder.query<Participant[], { userId: string; recordingId: string }>({
      query: ({ userId, recordingId }) =>
        `shared-recordings/getSharedRecordingParticipants/${recordingId}/${userId}`,
      providesTags: ["shared"],
    }),

    addParticipant: builder.mutation<void, { recordingId: string; email: string }>({
      query: ({ recordingId, email }) => ({
        url: `shared-recordings/addParticipant`,
        method: "POST",
        body: { recordingId, email },
      }),
      invalidatesTags: ["shared"],
    }),

    getPreviouslySharedEmails: builder.query<Participant[], string>({
      query: (userId) => `shared-recordings/sharedEmails/${userId}`,
    }),

    deleteParticipant: builder.mutation<void, { recordingId: string; email: string }>({
      query: ({ recordingId, email }) => ({
        url: `shared-recordings/deleteParticipant`,
        method: "DELETE",
        body: { recordingId, email },
      }),
      invalidatesTags: ["shared"],
    }),

  }),
});

export const { useGetSharedWithQuery, useAddParticipantMutation, useGetPreviouslySharedEmailsQuery, useDeleteParticipantMutation } = ShareApi;
