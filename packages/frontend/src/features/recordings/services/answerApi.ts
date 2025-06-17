import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";

export const AnswerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnswersByIdUser: builder.query<Answer[], string>({
            query: (id) => `answers/getAllAnswersByIdUser/${id}`,
            providesTags: ["answers"],  
        })
    })
});

export const { useGetAnswersByIdUserQuery } = AnswerApi;
