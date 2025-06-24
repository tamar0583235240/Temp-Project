import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/",

    }),
    reducerPath: "api",
    tagTypes: ["Item","answers","question", "shared"],
    endpoints: () => ({}),
});


