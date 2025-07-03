// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiA = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5010",
        credentials: 'include',
    }),
    reducerPath: "apiA",
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question"],
    endpoints: () => ({}),
});



export const apiB = createApi({
    
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5011",
        credentials: 'include',
    }),
    reducerPath: "apiB",
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question"],
    endpoints: () => ({}),
});