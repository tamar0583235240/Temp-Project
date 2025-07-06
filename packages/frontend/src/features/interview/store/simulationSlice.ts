import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { interviewType } from "../types/questionType";
import { InitialState } from "../types/initialState";

// מצב התחלתי
const initialState: InitialState = {
  questions: [],
  currentIndex: 0,
  loading: false,
  currentAnswerId: "550e8400-e29b-41d4-a716-446655440000" 
};

// יצירת הסלייס
const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    // עדכון כל השאלות
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

    // מעבר לשאלה הבאה
    nextQuestion(state) {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
      }
    },

    // חזרה לשאלה הקודמת
    prevQuestion(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },

    // קפיצה לשאלה ספציפית
    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    }
  },
});

// יצוא פעולות
export const {
  setQuestions,
  answerQuestion,
  resetQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  setCurrentAnswerId,
} = simulationSlice.actions;

// יצוא ברירת מחדל של הרידוסר
export default simulationSlice.reducer;


