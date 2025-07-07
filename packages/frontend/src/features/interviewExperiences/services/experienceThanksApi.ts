import { api } from "../../../shared/api/api";
import { experienceThanks } from "../types/experienceThanks";

export const experienceThanksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperienceThanks: builder.query<experienceThanks[] , void>({
      query: () => `/experienceThanks/getAllExperienceThanks`,
      providesTags: ["experienceThanks"],
    })
  }),
});

export const {
  useGetAllExperienceThanksQuery,
} = experienceThanksApi;
