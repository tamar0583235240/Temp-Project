import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tip } from '../types/tip';


export const tipsApi = createApi({
  reducerPath: 'tipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTips: builder.query<Tip[], void>({
      query: () => 'tips',
    }),
  }),
});

export const { useGetTipsQuery } = tipsApi;