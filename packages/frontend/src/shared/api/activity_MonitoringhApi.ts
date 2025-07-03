import { api } from './api';


export const activity_MonitoringhApi = api.injectEndpoints({
  endpoints: (builder) => ({
      sendPageTime: builder.mutation<void, { page: string; timeSpentSec: number }>({
      query: (body) => ({
        url: "/monitoringh",
        method: "POST",
        body,
      }),
    }),
  })
})
export const {
useSendPageTimeMutation
} = activity_MonitoringhApi;











