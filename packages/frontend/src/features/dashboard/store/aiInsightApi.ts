import { api } from "../../../shared/api/api";
import { AIInsight } from "../types/AIInsightType"; 

export const aiInsightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAIInsights: builder.query<AIInsight[], void>({
      query: () => ({
        url: "http://localhost:5002/api/aiInsight", 
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAIInsightsQuery } = aiInsightApi;
