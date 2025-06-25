import { api } from "./api";

export const resourceApi = api.injectEndpoints({
  endpoints: (build) => ({
    createResource: build.mutation<void, FormData>({
      query: (formData) => ({
        url: "api/resources", 
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateResourceMutation } = resourceApi;
