import { api } from "../api/api";

export const educationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEducationEntries: builder.query({
      query: (userId: string) => `/api/education?user_id=${userId}`,
      providesTags: ['EducationEntry'],
    }),
    createEducationEntry: builder.mutation({
      query: (newEntry) => ({
        url: '/api/education',
        method: 'POST',
        body: newEntry,
      }),
      invalidatesTags: ['EducationEntry'],
    }),
    updateEducationEntry: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/education/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['EducationEntry'],
    }),
    deleteEducationEntry: builder.mutation({
      query: (id) => ({
        url: `/api/education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EducationEntry'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEducationEntriesQuery,
  useCreateEducationEntryMutation,
  useUpdateEducationEntryMutation,
  useDeleteEducationEntryMutation,
} = educationApi;
