import { InterviewMaterial } from "../../features/knowledge-base/types/InterviewMaterials";
import { api } from "./api";

interface deleteRes {
  success: boolean;
  message: string;
}

export const interviewMaterialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInterviewMaterials: builder.query<InterviewMaterial[], void>({
      query: () => ({
        url: "/interview-materials-hub",
        method: "GET",
      }),
      providesTags: ["InterviewMaterials"], // <-- הוספת תג
    }),

    deleteInterviewMaterial: builder.mutation<deleteRes, number>({
      query: (id) => ({
        url: `/interview-materials-hub/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["InterviewMaterials"], // פסילת קאש אחרי מחיקה
    }),

    createInterviewMaterialSub: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/interview-materials-hub",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["InterviewMaterials"], // פסילת קאש אחרי יצירה
    }),
  }),
});

export const {
  useDeleteInterviewMaterialMutation,
  useGetInterviewMaterialsQuery,
  useCreateInterviewMaterialSubMutation,
} = interviewMaterialApi;
