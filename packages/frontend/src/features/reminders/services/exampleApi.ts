
import { api } from "../../../shared/api/api";
import { reminderType } from "../types/reminderType";

export const remainderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<reminderType[], void>({
      query: () => "items",
      providesTags: ["Item"],
    }),
    addItem: builder.mutation<reminderType, Partial<reminderType>>({
      query: (item) => ({
        url: "items",
        method: "POST",
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
} = remainderApi;
