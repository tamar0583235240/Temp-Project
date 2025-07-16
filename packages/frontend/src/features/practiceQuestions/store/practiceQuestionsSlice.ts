import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PracticeQuestion } from "../types/practiceQuestionsType";

interface PracticeQuestionsState {
  data: PracticeQuestion[];
  loading: boolean;
  topicId: string;
}

const initialState: PracticeQuestionsState = {
  data: [],
  loading: false,
  topicId: "00000000-0000-0000-0000-000000000001",
};

const practiceQuestionsSlice = createSlice({
  name: "practiceQuestions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<PracticeQuestion[]>) {
      state.data = action.payload;
    },
    addQuestion(state, action: PayloadAction<PracticeQuestion>) {
      state.data.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setQuestions, addQuestion, setLoading } = practiceQuestionsSlice.actions;
export default practiceQuestionsSlice.reducer;
