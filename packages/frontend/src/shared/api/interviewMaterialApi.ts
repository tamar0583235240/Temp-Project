import { InterviewMaterial } from "../../features/knowledge-base/types/InterviewMaterial";
import { api } from "./api";

interface deleteRes {
  success: boolean;
  message: string;
}

export const interviewMaterialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInterviewMaterials: builder.query<InterviewMaterial[], void>({
      query: () => ({
        url: "/interviewMaterial",
        method: "GET",
      }),
    }),

    deleteInterviewMaterial: builder.mutation<deleteRes, number>({
      query: (id) => ({
        url: `/interview-material/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useDeleteInterviewMaterialMutation,
  useGetInterviewMaterialsQuery,
} = interviewMaterialApi;
