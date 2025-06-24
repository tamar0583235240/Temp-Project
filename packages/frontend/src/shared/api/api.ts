import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001/",

    }),
    reducerPath: "api",
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question"],
    endpoints: () => ({}),
});



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { SharedRecordingItem } from "../../features/shared-recordings/types/sharedRecording";
// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5002/", // ודאי שזו הכתובת הנכונה לשרת שלך
//   }),
//   reducerPath: "api",
//   tagTypes: ["SharedRecordings",'Item'],
//   endpoints: (builder) => ({
//     getSharedRecordings: builder.query<SharedRecordingItem[], string>({
//       query: (userId) => `api/shared-recordings/${userId}`,
//       providesTags: ["SharedRecordings"],
//     }),
//   }),
// });

// export const { useGetSharedRecordingsQuery } = api;



