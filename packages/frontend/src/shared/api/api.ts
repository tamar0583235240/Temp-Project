import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api", // שם ה-slice ב-store
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // הכתובת הבסיסית של השרת שלך
  }),
  tagTypes: ["SharedRecordings", "Feedback", "Answers", "Questions"], // כאן מכריזים על tags שתשתמשי בהם
  endpoints: () => ({}), // endpoints יתווספו ע"י injectEndpoints
});
