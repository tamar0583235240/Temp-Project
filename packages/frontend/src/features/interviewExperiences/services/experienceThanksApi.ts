import { api } from "../../../shared/api/api";
import { experienceThanks } from "../types/experienceThanks";

export const experienceThanksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperienceThanks: builder.query<experienceThanks[], void>({
      query: () => `/experienceThanks/getAllExperienceThanks`,
      providesTags: ["experienceThanks"],
    })
    ,
    addExperienceThanks: builder.mutation<experienceThanks, experienceThanks>({
      query: (experienceThanks) => ({
        url: `/experienceThanks/addExperienceThanks`,
        method: 'POST',
        body: experienceThanks,
      }),
      invalidatesTags: ["experienceThanks"],
    }),
  }),
});

export const {
  useGetAllExperienceThanksQuery, useAddExperienceThanksMutation
} = experienceThanksApi;
