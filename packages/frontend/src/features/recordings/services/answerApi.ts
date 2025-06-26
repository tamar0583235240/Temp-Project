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
            query: (id) => `question/getAllQuestionById/${id}`,
            providesTags: ["question"],
<<<<<<< HEAD
        }),
=======
        })
>>>>>>> 8d7d8a21a7e51e0e565bee46575e3ba71e17593d
    })
});

export const { useGetAnswersByIdUserQuery, useGetQuestionByIdQuery } = AnswerApi;
