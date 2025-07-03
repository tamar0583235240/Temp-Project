// import { api } from './api';


// export const activity_MonitoringhApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//       sendPageTime: builder.mutation<void, { page: string; timeSpentSec: number }>({
//       query: (body) => ({
//         url: "/monitoringh",
//         method: "POST",
//         body,
//       }),
//     }),
//   })
// })
// export const {
// useSendPageTimeMutation
// } = activity_MonitoringhApi;



export const fetchActivityData = async () => {
  const response = await fetch("/api/activity");
  if (!response.ok) throw new Error("שגיאה בשליפת הנתונים");
  return response.json();
};








