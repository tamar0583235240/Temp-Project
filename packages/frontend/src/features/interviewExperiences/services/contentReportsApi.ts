import { api } from "../../../shared/api/api";
import { ContentReports } from "../types/contentReports";

export const contentReportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addContentReports: builder.mutation<ContentReports, ContentReports>({
      query: (contentReport) => ({
        url: `/contentReports/addcontentReports`,
        method: 'POST',
        body: contentReport,
      }),
    //   invalidatesTags: ["contentReports"],
    }),
  }),
});

export const {
   useAddContentReportsMutation
} = contentReportsApi;
