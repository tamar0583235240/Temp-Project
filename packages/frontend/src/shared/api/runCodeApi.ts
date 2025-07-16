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

    // // שליפת כל הנושאים
    // getAllTopics: builder.query({
    //   query: () => `api/codeQuestions/topics`,
    // }),

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
  }),
});

export const {
  useGetAllQuestionsQuery,
//   useGetAllTopicsQuery,
  useSubmitAnswerMutation,
  useRunCodeMutation,
} = practiceApi;
