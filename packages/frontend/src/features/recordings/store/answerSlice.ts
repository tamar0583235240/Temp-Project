import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer } from '../types/Answer';

interface AnswerState {
  data: Answer[];
  loading: boolean;
}

const initialState: AnswerState = {
  data: [],
  loading: false,
};

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setAnswerByUserId(state, action: PayloadAction<Answer>) {
      const index = state.data.findIndex(answer => answer.user_id === action.payload.user_id);
      if (index !== -1)
        state.data[index] = action.payload;
      else
        state.data.push(action.payload);
    }
  },
});

export const  setAnswerByUserId  = answerSlice.actions;
export default answerSlice.reducer;