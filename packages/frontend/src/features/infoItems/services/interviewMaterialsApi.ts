import { api } from "../../../shared/api/api";
import { InterviewMaterial } from "../types/interviewMaterial";

export const interviewMaterialsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getInterviewMaterials: build.query<InterviewMaterial[], void>({
      query: () => "admin/interview-materials",
    }),
    deleteInterviewMaterial: build.mutation<void, string>({
      query: (id) => ({
        url: `admin/interview-materials/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInterviewMaterialsQuery,
  useDeleteInterviewMaterialMutation,
} = interviewMaterialsApi;