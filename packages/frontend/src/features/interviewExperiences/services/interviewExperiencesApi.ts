import { api } from "../../../shared/api/api";
import { interviewExperiences } from "../types/interviewExperiences";

export const interviewExperiencesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllInterviewExperiences: builder.query<interviewExperiences[] , void>({
      query: () => `/interviewExperiences/getAllInterviewExperiences`,
      providesTags: ["interviewExperiences"],
    })
  }),
});

export const {
  useGetAllInterviewExperiencesQuery
} = interviewExperiencesApi;
