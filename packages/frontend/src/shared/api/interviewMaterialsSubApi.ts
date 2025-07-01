import { api } from "./api";

export const interviewMaterialSubApi = api.injectEndpoints({
  endpoints: (build) => ({
    createInterviewMaterialSub: build.mutation<void, FormData>({
      query: (formData) => ({
        url: "/interview-materials-sub",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateInterviewMaterialSubMutation } = interviewMaterialSubApi;
