import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { interviewType } from "../types/questionType";
import { InitialState } from "../types/initialState";

const initialState: InitialState = {
  questions: [],
  currentIndex: 0,
  loading: false,
  currentAnswerId: "00000000-0000-0000-0000-000000000030" // חדש: מזהה תשובה נוכחית
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<interviewType[]>) {
      state.questions = action.payload;
    },
    answerQuestion(
      state,
      action: PayloadAction<{ index: number; answer: string; answerId?: string }>
    ) {
      const { index, answer, answerId } = action.payload;
      if (state.questions[index]) {
        state.questions[index].answer = answer;
        state.questions[index].answered = true;
        if (answerId) {
          state.currentAnswerId = answerId;
        }
      }
    },
    setCurrentAnswerId(state, action: PayloadAction<string | null>) {
      state.currentAnswerId = action.payload;
    },
    resetQuestion(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (state.questions[index]) {
        state.questions[index].answer = "";
        state.questions[index].answered = false;
      }
    },

    nextQuestion(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
      }
    },

    prevQuestion(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },

    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    }
  }
});
export const {
  setQuestions,
  answerQuestion,
  resetQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  setCurrentAnswerId,
} = simulationSlice.actions;
export default simulationSlice.reducer;


