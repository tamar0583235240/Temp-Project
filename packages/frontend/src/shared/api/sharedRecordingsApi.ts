// ---------------- src/shared/api/sharedRecordingsApi.ts ----------------
import { api } from "./api"; // התאימי נתיב במידת הצורך

export type SharedRecording = {
  id: string;
  owner_id: string;
  answer_id: string;
  shared_with: string[];
};

export const sharedRecordingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET ‑ כל ההקלטות
    getSharedRecordings: builder.query<SharedRecording[], void>({
      query: () => "api/sharedRecordings",
      providesTags: ["SharedRecording"], // שם יחיד תואם ל‑tagTypes
    }),

    // DELETE ‑ הסרת מייל מהרשאות
    removeEmail: builder.mutation<void, { id: string; email: string }>({
      query: ({ id, email }) => ({
        url: `api/sharedRecordings/${id}/shared/${encodeURIComponent(email)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SharedRecording"], // מרענן רשימה
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSharedRecordingsQuery,
  useRemoveEmailMutation,
} = sharedRecordingsApi;