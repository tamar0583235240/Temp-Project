// import { api } from "../../../shared/api/api";
// import { user, UploadResponse } from "../types/userType";

// export const adminApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query<user[], void>({
//       query: () => {
//         const endpoint = "/api/admin"; // קישור מלא ומדויק
//         console.log("🔎 שליחה לכתובת:", `http://localhost:5000${endpoint}`);
//         return endpoint;
//       },
//       providesTags: ["users"],
//     }),
//     updateUser: builder.mutation<user, { id: string; data: Partial<user> }>({
//       query: ({ id, data }) => ({
//         url: `/api/admin/${id}`, // קישור מלא ומדויק
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["users"],
//     }),
//     createUser: builder.mutation<user, Partial<user>>({
//       query: (newUser) => ({
//         url: "/api/admin/", // POST ליצירת משתמש חדש
//         method: "POST",
//         body: newUser,
//       }),
//       invalidatesTags: ["users"],
//     }),
//     deleteUser: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/api/admin/${id}`, // מחיקה לפי מזהה
//         method: "DELETE",
//       }),
//       invalidatesTags: ["users"],
//     }),
//     uploadUsersExcel: builder.mutation<UploadResponse, FormData>({
//       query: (formData) => ({
//         url: "/api/admin/upload", // העלאת אקסל
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["users"],
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useCreateUserMutation,
//   useUploadUsersExcelMutation,
// } = adminApi;
