import { api } from './api';
import { User } from '../../features/auth/types/types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
     addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    authWithGoogle: builder.mutation({
      query: (token: string) => ({
        url: '/auth/google-auth',
        method: 'POST',
        body: {
          payload: { credential: token },
        },
      }),
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useAddUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation,
  useAuthWithGoogleMutation
} = userApi;
