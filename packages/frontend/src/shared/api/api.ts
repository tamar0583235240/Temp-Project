import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001/",

    }),
    reducerPath: "api",
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question"],
    endpoints: () => ({}),
});



