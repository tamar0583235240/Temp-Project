import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
<<<<<<< HEAD
        baseUrl: "http://localhost:5000",
        credentials: 'include',
=======
        baseUrl: "http://localhost:5000/api",

>>>>>>> 7671d8f (AI Insights List fronted)
    }),
    reducerPath: "api",

    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question","shared_recordings","admin","users","DynamicContents"],
    endpoints: () => ({}),
});





