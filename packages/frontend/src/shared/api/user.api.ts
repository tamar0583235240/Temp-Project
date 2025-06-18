import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }),
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<any, string>({
      query: (token) => ({
        url: '/google-login',
        method: 'POST',
        body: { payload: { credential: token } },
      }),
    }),
    registerWithGoogle: builder.mutation<any, string>({
      query: (token) => ({
        url: '/google-register',
        method: 'POST',
        body: { payload: { credential: token } },
      }),
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useRegisterWithGoogleMutation,
} = userApi;
