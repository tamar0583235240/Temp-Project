
import { createApi} from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        credentials: 'include',
    }),
    reducerPath: "api",
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question","shared_recordings"],
    endpoints: () => ({}),
});