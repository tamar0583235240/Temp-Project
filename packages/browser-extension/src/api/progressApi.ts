import { api } from './api';
 import type { ProgressData } from './types';

export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: '/auth/login',
          method: 'POST',
          body: credentials,
          credentials: 'include'
        })
      }
    ),

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
  })
});

// שמות ה־hooks לשימוש בקומפוננטות
export const {
  useLoginMutation,
  useGetProgressQuery,
  useGetTipsQuery
} = progressApi;
