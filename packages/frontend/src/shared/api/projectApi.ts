import { api } from "./api";
import { PersonalProject } from "../../features/profile/types/projects";

interface DeleteRes {
  success: boolean;
  message: string;
}

export const personalProjectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPersonalProject: builder.mutation<void, Partial<PersonalProject>>({
      query: (body) => ({
        url: "/personal-projects",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    getPersonalProjects: builder.query<PersonalProject[], string>({
      query: (userId) => ({
        url: `/personal-projects/${userId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Item" as const, id })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
    }),

    updatePersonalProject: builder.mutation<void, Partial<PersonalProject> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/personal-projects/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Item", id }],
    }),

    deletePersonalProject: builder.mutation<DeleteRes, number>({
      query: (id) => ({
        url: `/personal-projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
  }),
});

export const {
  useCreatePersonalProjectMutation,
  useGetPersonalProjectsQuery,
  useUpdatePersonalProjectMutation,
  useDeletePersonalProjectMutation,
} = personalProjectsApi;
