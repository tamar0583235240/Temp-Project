// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:5000/",

//     }),
//     reducerPath: "api",
//     tagTypes: ["Item"],
//     endpoints: () => ({}),
// });



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     // baseUrl: "http://localhost:5000/",
//     baseUrl: "http://localhost:5000/api/",
//   }),
//   tagTypes: ["User", "Item"], // להוסיף כאן את כל הטאגים הרלוונטיים
//   endpoints: () => ({}), // יש להוסיף כאן את האנדפוינטים בהמשך
// });



// shared/api/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProgressStats } from "../../features/dashboard/types/progress";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",

    }),
    reducerPath: "api",
    tagTypes: ["users", "questions", "answers", "insights"],
    // endpoints: () => ({}),
    endpoints: (builder) => ({
  getProgressStats: builder.query<ProgressStats, string>({
    query: (userId) => `questions/progress/${userId}`,
  }),
}),
});
export const { useGetProgressStatsQuery } = api;