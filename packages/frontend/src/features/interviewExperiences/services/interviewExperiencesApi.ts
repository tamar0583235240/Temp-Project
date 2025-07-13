import { api } from "../../../shared/api/api";
import { interviewExperiences } from "../types/interviewExperiences";

export const interviewExperiencesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterviewExperiences: builder.query<interviewExperiences[] , void>({
      query: () => `/interviewExperiences/getAllInterviewExperiences`,
      providesTags: ["interviewExperiences"],
    }),
    deleteInterviewExperiencesById: builder.mutation<void , string>({
      query: (id) => ({
        url: `/interviewExperiences/deleteInterviewExperience/${id}`,
        method: 'DELETE', 
    }),
    invalidatesTags: [{ type: 'interviewExperiences'}],})
  }),
  
});

export const {
  useGetAllInterviewExperiencesQuery, useDeleteInterviewExperiencesByIdMutation
} = interviewExperiencesApi;
