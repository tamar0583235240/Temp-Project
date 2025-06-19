import { api } from "../../../shared/api/api";
import { FeedBack } from "../types/Feedback";

export const feedbackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbackByAnswerCode: builder.query<FeedBack[], string>({
            query: (answerCode) => `feedbacks/getAllFeedbacks/${answerCode} `,
            providesTags: ["feedbacks"],  
        })
    })
});

export const { useGetFeedbackByAnswerCodeQuery } = feedbackApi;