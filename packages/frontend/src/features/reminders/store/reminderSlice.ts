import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import reminderType from '../types/reminderType';


interface ReminderState {
  data: reminderType[];
  loading: boolean;
}

const initialState: ReminderState = {
  data: [],
  loading: false,
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = reminderSlice.actions;
export default reminderSlice.reducer;
