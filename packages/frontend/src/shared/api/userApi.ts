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
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
