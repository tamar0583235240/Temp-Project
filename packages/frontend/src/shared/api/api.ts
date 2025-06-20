import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",

    }),
    reducerPath: "api",
    tagTypes: ["Item"],
    endpoints: () => ({}),
});


