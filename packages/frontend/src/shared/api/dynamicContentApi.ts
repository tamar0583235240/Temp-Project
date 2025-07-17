import { api } from './api';

export interface DynamicContent {
  id: number;
  key_name: string;
  description: string;
  content: string;
}

export const dynamicContentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDynamicContents: builder.query<DynamicContent[], void>({
      query: () => '/api/dynamic-contents',
      providesTags: ['DynamicContents'],
    }),

    updateDynamicContent: builder.mutation<DynamicContent, { id: number; content: string }>({
      query: ({ id, content }) => ({
        url: `/api/dynamic-contents/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['DynamicContents'],
    }),
  }),
});

export const {
  useGetDynamicContentsQuery,
  useUpdateDynamicContentMutation,
} = dynamicContentApi;
