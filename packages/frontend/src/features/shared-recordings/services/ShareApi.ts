import { api } from "../../../shared/api/api";
import { Participant } from "../types/Participant";

export const ShareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSharedWith: builder.query<Participant[], { userId: string; recordingId: string }>({
      query: ({ userId, recordingId }) =>
        `shared-recordings/getSharedRecordingParticipants/${recordingId}/${userId}`,
      providesTags: ["shared"],
    }),
  }),
});

export const { useGetSharedWithQuery } = ShareApi;
