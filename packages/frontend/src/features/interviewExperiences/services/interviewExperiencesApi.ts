import { api } from "../../../shared/api/api";
import { interviewExperiences } from "../types/interviewExperiences";

export const interviewExperiencesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterviewExperiences: builder.query<interviewExperiences[], void>({
      query: () => `/interviewExperiences/getAllInterviewExperiences`,
      providesTags: ["interviewExperiences"],
    }),
    deleteInterviewExperiencesById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/interviewExperiences/deleteInterviewExperience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'interviewExperiences' }],
    }),
    AddInterviewExperiences: builder.mutation<void, interviewExperiences>({
      query: (interviewExperience) => ({
        url: `/interviewExperiences/addInterviewExperiences`,
        method: 'POST',
        body: interviewExperience,
      }),
      invalidatesTags: ["interviewExperiences"],
    }),
  }),
});

export const {
  useGetAllInterviewExperiencesQuery,
  useDeleteInterviewExperiencesByIdMutation,
  useAddInterviewExperiencesMutation,
} = interviewExperiencesApi;
