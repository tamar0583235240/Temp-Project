import { api } from "../../../shared/api/api";
import { user } from "../types/userTypes"; // טיפוס של משתמש

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // שליפת כל המשתמשים
    getUsers: builder.query<user[], void>({
      query: () => "users",
      providesTags: ["users"], // ✅ עובד רק אם tagTypes מוגדר
    }),

    // עדכון משתמש
    updateUser: builder.mutation<user, { id: string; data: Partial<user> }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"], // ✅ יעדכן את המטמון
    }),

createUser: builder.mutation<user, Partial<user>>({
  query: (newUser) => ({
    url: "users/add",
    method: "POST",
    body: newUser,
  }),
  invalidatesTags: ["users"],
}),


    // מחיקת משתמש
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = adminApi;
