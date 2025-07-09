// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
<<<<<<< HEAD
        baseUrl: "http://localhost:3001/",
=======
        baseUrl: "http://localhost:5000",
>>>>>>> newTaskG4
        credentials: 'include',
    }),
    reducerPath: "api",
    tagTypes: ["Item" ,"Feedback" ,"AiInsights","answers","question","shared","questionStats"],
    endpoints: () => ({}),
});
<<<<<<< HEAD
=======



>>>>>>> newTaskG4
