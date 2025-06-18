import { api } from "../../../shared/api/api";
import { AiInsightsType } from "../types/AIInsightsType";



export const AiInsightsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAiInsightsByAnswerId: builder.query<AiInsightsType[], string>({
      query: (answerId) => `api/AiInsights/getAiInsightsByAnswerId/${answerId}`,
      providesTags: ["AiInsights"],
    })

  }),
});

export const {
  useGetAiInsightsByAnswerIdQuery
} = AiInsightsApi;
