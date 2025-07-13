import { api } from "../../../shared/api/api";
import { FeedbackToSystem } from "../types/FeedbackToSystem";

export const FeedbackToSystemApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // createFeedbackToSystem: builder.mutation<FeedbackToSystem, FeedbackToSystem>({
        //     query: (feedback) => ({
        //         url: "feedbackToSystem/createFeedback",
        //         method: "POST",
        //         body: feedback,
        //     }),
        //     invalidatesTags: ["feedback"],
        // }),
        getFeedbackToSystemByUserId: builder.query<FeedbackToSystem[], string>({
            query: (id) => `feedbackToSystem/getFeedbackesByuserId/${id}`,
            providesTags: ["FeedbackToSystem"],
        }),
        updateFeedbackToSystem: builder.mutation<FeedbackToSystem, Partial<FeedbackToSystem>>({
            query: (data) => ({
                url: `feedbackToSystem//updateFeedbackToSystem`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["FeedbackToSystem"],
        }),
        deleteFeedbackToSystem: builder.mutation<void, string>({
            query: (id) => ({
                url: `feedbackToSystem/deleteFeedbackToSystem/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FeedbackToSystem"],
        })
    })
});

export const { useGetFeedbackToSystemByUserIdQuery,useUpdateFeedbackToSystemMutation,useDeleteFeedbackToSystemMutation } = FeedbackToSystemApi;