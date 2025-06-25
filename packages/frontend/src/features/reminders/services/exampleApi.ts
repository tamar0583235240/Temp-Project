
import { api } from "../../../shared/api/api";
import { reminder } from "../types/reminderType";

export const remainderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<reminder[], void>({
      query: () => "items",
      providesTags: ["Item"],
    }),
    addItem: builder.mutation<reminder, Partial<reminder>>({
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
