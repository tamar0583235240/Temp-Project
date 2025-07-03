// src/shared/api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types';
import type { ProgressData } from './types';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const api = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:5000', // שנה בהתאם לשרת שלך
    credentials: 'include', // שולח את הקוקי
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.query<LoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
    getProgress: builder.query<ProgressData, string>({
      query: (token) => ({
        url: '/progress',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),

    getTips: builder.query<string[], string>({
      query: (token) => ({
        url: '/tips',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenQuery, useGetProgressQuery, useGetTipsQuery } = api;
