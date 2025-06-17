import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { interviewType } from '../types/interviewType';

interface InterviewState {
  data: interviewType[];
  currentIndex: number;
  loading: boolean;
}

const initialState: InterviewState = {
  data: [],
  currentIndex: 0,
  loading: false,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<interviewType[]>) {
      state.data = action.payload;
      state.currentIndex = 0;
    },
    nextQuestion(state) {
      if (state.currentIndex < state.data.length - 1) {
        state.currentIndex += 1;
      }
    },
    previousQuestion(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setItems,
  nextQuestion,
  previousQuestion,
  setLoading,
} = interviewSlice.actions;

export default interviewSlice.reducer;
