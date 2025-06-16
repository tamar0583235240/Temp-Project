import { api } from "../../../shared/api/api";
import { User } from "../types/userTypes"; // טיפוס של משתמש

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // שליפת כל המשתמשים
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"], // ✅ עובד רק אם tagTypes מוגדר
    }),

    // עדכון משתמש
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"], // ✅ יעדכן את המטמון
    }),

    // מחיקת משתמש
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
