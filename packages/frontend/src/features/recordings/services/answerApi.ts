import { api } from "../../../shared/api/api";
<<<<<<< HEAD
=======
import { Answer } from "../types/answer";
>>>>>>> newTaskG4
import { Question } from "../types/Question";
import { Stats } from "../types/Stats";
import { Answer } from "../types/answer";

export const AnswerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnswersByIdUser: builder.query<Answer[], string>({
            query: (id) => `answers/getAllAnswersByIdUser/${id}`,
            providesTags: ["answers"],
        }),
        getQuestionById: builder.query<Question, string>({
            query: (id) => `question/getAllQuestionById/${id}`,
            providesTags: ["question"],
        }),
        // ←‑‑‑  Endpoint חדש
        getQuestionsStatsByUserId: builder.query<Stats, void>({
            query: () => `question/stats`,   // הנתיב ב‑backend
            providesTags: ["questionStats"],
        }),
    })
});
export const { useGetAnswersByIdUserQuery, useGetQuestionByIdQuery, useGetQuestionsStatsByUserIdQuery} = AnswerApi;