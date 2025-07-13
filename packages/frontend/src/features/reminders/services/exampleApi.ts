
import { api } from "../../../shared/api/api";
import { UserReminderSetting } from "../types/reminderType";


export const remainderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<UserReminderSetting[], void>({
      query: () => "items",
      providesTags: ["Reminders"],
    }),
    addItem: builder.mutation<UserReminderSetting, Partial<UserReminderSetting>>({
      query: (item) => ({
        url: "items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Reminders"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reminders"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = remainderApi;