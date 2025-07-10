import { api } from "../../../shared/api/api";
import { aiInsightsType } from "../types/aiInsightsType";

export const aiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
<<<<<<< HEAD
    getAiInsights: builder.query<aiInsightsType[], void>({
      query: () => "/AiInsights/getAiInsights",
      providesTags: ["users"],
    }),
    getAiInsightsByAnswerId: builder.query<aiInsightsType[], string>({
      query: (answerId) => `/AiInsights/getAiInsightsByAnswerId/${answerId}`,
      providesTags: ["users"],
=======
    getItems: builder.query<aiInsightsType[], void>({
      query: () => "/insights",
      providesTags: ["Item"],
    }),
    addItem: builder.mutation<aiInsightsType, Partial<aiInsightsType>>({
      query: (item) => ({
        url: "/insights",
        method: "GET",
        body: item,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
>>>>>>> 7671d8f (AI Insights List fronted)
    }),
  }),
});

export const {
<<<<<<< HEAD
  useGetAiInsightsQuery,
  useGetAiInsightsByAnswerIdQuery,
} = aiInsightsApi;

=======
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = aiInsightsApi;
>>>>>>> 7671d8f (AI Insights List fronted)
