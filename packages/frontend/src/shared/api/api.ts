// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001/api/",
    }),
    reducerPath: "api",
    tagTypes: ["Item"],
    endpoints: () => ({}),
});


