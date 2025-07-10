import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { interviewType } from "../types/questionType";
import { InitialState } from "../types/initialState";

const initialState: InitialState = {
  questions: [],
  currentIndex: 0,
  loading: false,
  currentAnswerId: "2151d5f9-6266-42e9-b7ee-c47a680d3a63", //מזהה תשובה נוכחית
  currentCategoryId: "",
  currentUserId: "cccc3333-3333-3333-3333-333333333333", //מזהה משתמש נוכחי
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<interviewType[]>) {
      state.questions = action.payload;
    },
    // answeredQuestions(
    //   state,
    //   action: PayloadAction<{ index: number; answer: string; answerId?: string }>
    // ) {
    //   const { index, answer, answerId } = action.payload;
    //   if (state.questions[index]) {
    //     state.questions[index].answer = answer;
    //     state.questions[index].answered = true;
    //     if (answerId) {
    //       state.currentAnswerId = answerId;
    //     }
    //   }
    // },
    setCurrentAnswerId(state, action: PayloadAction<string | null>) {
      state.currentAnswerId = action.payload ?? "";
    },

    setCurrentCategoryId(state, action: PayloadAction<string | null>) {
      state.currentCategoryId = action.payload ?? "";
    },

    setCurrentUserId(state, action: PayloadAction<string | null>) {
      state.currentUserId = action.payload ?? "";
    },

    // resetQuestion(state, action: PayloadAction<number>) {
    //   const index = action.payload;
    //   if (state.questions[index]) {
    //     state.questions[index].answer = "";
    //     state.questions[index].answered = false;
    //   }
    // },

    // nextQuestion(state) {
    //   if (state.currentIndex < state.questions.length - 1) {
    //     state.currentIndex++;
    //   }
    // },

    // prevQuestion(state) {
    //   if (state.currentIndex > 0) {
    //     state.currentIndex--;
    //   }
    // },

    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    }
  }
});
export const {
  setQuestions,
  // answeredQuestions,
  // resetQuestion,
  // nextQuestion,
  // prevQuestion,
  goToQuestion,
  setCurrentAnswerId,
  setCurrentUserId,
  setCurrentCategoryId
} = simulationSlice.actions;
export default simulationSlice.reducer;


