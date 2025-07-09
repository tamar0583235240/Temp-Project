import { InterviewMaterials } from "../../features/knowledge-base/types/InterviewMaterials";
import { api } from "./api";

interface deleteRes {
  success: boolean;
  message: string;
}

export const interviewMaterialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInterviewMaterials: builder.query<InterviewMaterials[], void>({
      query: () => ({
        url: "/interview-materials-hub",
        method: "GET",
      }),
    }),

    deleteInterviewMaterial: builder.mutation<deleteRes, string>({
      query: (id) => ({
        url: `/interview-materials-hub/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
     createInterviewMaterialSub: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/interview-materials-hub",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useDeleteInterviewMaterialMutation,
  useGetInterviewMaterialsQuery,
  useCreateInterviewMaterialSubMutation,
} = interviewMaterialApi;
