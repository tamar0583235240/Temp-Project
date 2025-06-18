import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../../types/questionType";

interface SimulationState {
  questions: QuestionType[];
  currentIndex: number;
}

const initialState: SimulationState = {
  questions: [],
  currentIndex: 0,
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<QuestionType[]>) {
      state.questions = action.payload;
    },
    answerQuestion(
      state,
      action: PayloadAction<{ index: number; answer: string }>
    ) {
      const { index, answer } = action.payload;
      if (state.questions[index]) {
        state.questions[index].answer = answer;
        state.questions[index].answered = true;
      }
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
    },
  },
});

export const {
  setQuestions,
  answerQuestion,
  resetQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
} = simulationSlice.actions;


export default simulationSlice.reducer;
