import { api } from "../../../shared/api/api";
import { interviewExperiences } from "../types/interviewExperiences";

export const interviewExperiencesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterviewExperiences: builder.query<interviewExperiences[] , void>({
      query: () => `/interviewExperiences/getAllInterviewExperiences`,
      providesTags: ["interviewExperiences"],
    }),
    adddInterviewExperiences: builder.mutation<void, interviewExperiences>({
      query: (interviewExperiences) => ({
        url: `/interviewExperiences/addInterviewExperiences`,
        method: 'POST',
        body: interviewExperiences,
      }),
      invalidatesTags: ["interviewExperiences"],
    }),
  }),
});

export const {
  useGetAllInterviewExperiencesQuery,useAdddInterviewExperiencesMutation
} = interviewExperiencesApi;
