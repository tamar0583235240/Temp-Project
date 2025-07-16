import { api } from "../../../shared/api/api";
import { aiInsightsType } from "../types/aiInsightsType";

export const aiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAiInsights: builder.query<aiInsightsType[], void>({
      query: () => "/AiInsights/getAiInsights",
      providesTags: ["users"],
    }),
    getAiInsightsByAnswerId: builder.query<aiInsightsType[], string>({
      query: (answerId) => `/AiInsights/getAiInsightsByAnswerId/${answerId}`,
      providesTags: ["users"],
    }),
    getItems: builder.query<aiInsightsType[], void>({
      query: () => "/insights",
      providesTags: ["Item"],
    }),
    addItem: builder.mutation<aiInsightsType, Partial<aiInsightsType>>({
      query: (item) => ({
        url: "/insights",
        method: "GET",  // שימי לב: בדרך כלל הוספה היא POST, בדקי אם צריך לשנות ל-POST
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
    }),
  }),
});

export const {
  useGetAiInsightsQuery,
  useGetAiInsightsByAnswerIdQuery,
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = aiInsightsApi;
