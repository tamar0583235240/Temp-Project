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
    }),
    getItems: builder.query<aiInsightsType[], void>({
      query: () => "/insights",
      providesTags: ["Item"],
=======
    getItems: builder.query<aiInsightsType[], void>({
      query: () => "/aiInsight",
      providesTags: ["users"],
>>>>>>> Activity-Monitoring
    }),
    addItem: builder.mutation<aiInsightsType, Partial<aiInsightsType>>({
      query: (item) => ({
        url: "/insights",
<<<<<<< HEAD
        method: "GET",  // שימי לב: בדרך כלל הוספה היא POST, בדקי אם צריך לשנות ל-POST
        body: item,
      }),
      invalidatesTags: ["Item"],
=======
        method: "GET",
        body: item,
      }),
      invalidatesTags: ["users"],
>>>>>>> Activity-Monitoring
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
<<<<<<< HEAD
      invalidatesTags: ["Item"],
=======
      invalidatesTags: ["users"],
>>>>>>> Activity-Monitoring
    }),
  }),
});

export const {
<<<<<<< HEAD
  useGetAiInsightsQuery,
  useGetAiInsightsByAnswerIdQuery,
=======
>>>>>>> Activity-Monitoring
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = aiInsightsApi;
