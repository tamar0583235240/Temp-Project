import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";

export const AnswerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnswersByIdUser: builder.query<Answer[], void>({
            query: (id) => `answers/${id}`,
            providesTags: ["Item"],  
        })
    })
});

export const { useGetAnswersByIdUserQuery } = AnswerApi;
