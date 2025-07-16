import { api } from "../../../shared/api/api";
import { AIInsight } from "../types/aiInsightsType";

export const aiInsightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAIInsights: builder.query<AIInsight[], void>({
<<<<<<< HEAD
      query: () => ({       
        url: "aiInsights/getAiInsights"
=======
      query: () => ({
        url: "/aiInsight"
>>>>>>> Activity-Monitoring
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAIInsightsQuery } = aiInsightApi;
