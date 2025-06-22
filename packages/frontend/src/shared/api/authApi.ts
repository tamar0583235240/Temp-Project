import { api } from './api';
import { User } from '../../features/auth/types/types';
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<LoginResponse, SignupRequest>({
      query: (newUser) => ({
        url: '/auth/signup',
        method: 'POST',
        body: newUser,
      }),
    }),
    refreshToken: builder.mutation<{ token: string }, void>({
       query: () => ({
          url: '/auth/refresh',
          method: 'POST',
          credentials: 'include', // חשוב כדי לשלוח cookie
  }),
}),

  }),
});

export const { useLoginMutation , useSignupMutation , useRefreshTokenMutation } = authApi;
