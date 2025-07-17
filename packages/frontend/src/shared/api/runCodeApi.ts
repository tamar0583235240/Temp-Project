// import { api } from '../api/api';

// export const practiceApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // שליפת שאלות כלליות לפי סינון (topic, level, type)
//     getAllQuestions: builder.query({
//       query: ({ topic, level, type }) => {
//         const params = new URLSearchParams();
//         if (topic) params.append('topic', topic);
//         if (level) params.append('level', level);
//         if (type) params.append('type', type);
//         return `api/codeQuestions/questions?${params.toString()}`;
//       },
//     }),

//     // // שליפת כל הנושאים
//     // getAllTopics: builder.query({
//     //   query: () => `api/codeQuestions/topics`,
//     // }),

//     // שליחת תשובה לשאלה
//     submitAnswer: builder.mutation({
//       query: ({ questionId, answer }) => ({
//         url: `api/codeQuestions/submitAnswer/${questionId}`,
//         method: 'POST',
//         body: { answer },
//       }),
//     }),

//     // הרצת קוד
//     runCode: builder.mutation({
//       query: ({ language, code }) => ({
//         url: `api/codeQuestions/runCode`,
//         method: 'POST',
//         body: { language, code },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetAllQuestionsQuery,
// //   useGetAllTopicsQuery,
//   useSubmitAnswerMutation,
//   useRunCodeMutation,
// } = practiceApi;
import { api } from '../api/api';

export const practiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // שליפת שאלות כלליות לפי סינון (topic, level, type)
    getAllQuestions: builder.query({
      query: ({ topic, level, type }) => {
        const params = new URLSearchParams();
        if (topic) params.append('topic', topic);
        if (level) params.append('level', level);
        if (type) params.append('type', type);
        return `api/codeQuestions/questions?${params.toString()}`;
      },
    }),

    // שליחת תשובה לשאלה
    submitAnswer: builder.mutation({
      query: ({ questionId, answer }) => ({
        url: `api/codeQuestions/submitAnswer/${questionId}`,
        method: 'POST',
        body: { answer },
      }),
    }),

    // הרצת קוד
    runCode: builder.mutation({
      query: ({ language, code }) => ({
        url: `api/codeQuestions/runCode`,
        method: 'POST',
        body: { language, code },
      }),
    }),

 
    // לייק או דיסלייק לשאלה
    voteQuestion: builder.mutation({
      query: ({ userId, questionId, liked }: { userId: string; questionId: string; liked: boolean }) => ({
        url: `api/codeQuestions/likes`,
        method: 'POST',
        body: { userId, questionId, liked },
      }),
    }),

    // שליפת מצב הלייקים לשאלה
    getQuestionVotes: builder.query({
      query: (questionId: string) => `api/codeQuestions/likes/${questionId}`,
    }),

    // שליפת כל הלייקים לכל השאלות
    getAllLikes: builder.query({
      query: () => `api/codeQuestions/allLikes`,
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useSubmitAnswerMutation,
  useRunCodeMutation,
  useVoteQuestionMutation,
  useGetQuestionVotesQuery,
} = practiceApi;
