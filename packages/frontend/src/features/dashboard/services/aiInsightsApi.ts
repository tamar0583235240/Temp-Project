import { api } from "../../../shared/api/api";
import { aiInsightsType } from "../types/aiInsightsType";

export const aiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = aiInsightsApi;
