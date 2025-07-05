import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";
import { Question } from "../types/Question";

export const AnswerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnswersByIdUser: builder.query<Answer[], string>({
            query: (id) => `answers/getAllAnswersByIdUser/${id}`,
            providesTags: ["Answers"],  
        }),
        
        getQuestionById: builder.query<Question, string>({
            query: (id) => `question/getAllQuestionById/${id}`,
            providesTags: ["Questions"],  
        })
    })
});

export const { useGetAnswersByIdUserQuery , useGetQuestionByIdQuery} = AnswerApi;
