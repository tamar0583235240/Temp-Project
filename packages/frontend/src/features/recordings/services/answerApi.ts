import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";
import { Question } from "../types/Question";

export const AnswerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnswersByIdUser: builder.query<Answer[], string>({
            query: (id) => `answers/getAllAnswersByIdUser/${id}`,
            providesTags: ["answers"],  
        }),
        
        getQuestionById: builder.query<Question, string>({
<<<<<<< HEAD
            query: (id) => `question/getAllQuestionById/${id}`,
=======
            query: (id) => `answers/getQuestionById/${id}`,
>>>>>>> 292850b63ee68c443c1ad15c0acee5afeab2ab93
            providesTags: ["question"],  
        })
    })
});

export const { useGetAnswersByIdUserQuery , useGetQuestionByIdQuery} = AnswerApi;
