import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const interviewMaterialApi = createApi({
  reducerPath: 'interviewMaterialApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/interview-material' }),
  tagTypes: ['InterviewMaterialSub'],
  endpoints: (builder) => ({
    getInterviewMaterialSubs: builder.query({
      query: () => '',
      providesTags: ['InterviewMaterialSub'],
    }),
    updateInterviewMaterialSub: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['InterviewMaterialSub'],
    }),
  }),
});

export const {
  useGetInterviewMaterialSubsQuery,
  useUpdateInterviewMaterialSubMutation,
} = interviewMaterialApi;
