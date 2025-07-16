// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { PracticeQuestion } from "../types/practiceQuestionTypes";

// interface PracticeQuestionsState {
//   data: PracticeQuestion[];
//   loading: boolean;
// }

// const initialState: PracticeQuestionsState = {
//   data: [],
//   loading: false,
// };

// const practiceQuestionsSlice = createSlice({
//   name: "practiceQuestions",
//   initialState,
//   reducers: {
//     setQuestions(state, action: PayloadAction<PracticeQuestion[]>) {
//       state.data = action.payload;
//     },
//     addQuestion(state, action: PayloadAction<PracticeQuestion>) {
//       state.data.push(action.payload);
//     },
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setQuestions, addQuestion, setLoading } = practiceQuestionsSlice.actions;
// export default practiceQuestionsSlice.reducer;
