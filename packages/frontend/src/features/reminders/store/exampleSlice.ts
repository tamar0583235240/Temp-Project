import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reminder } from '../types/reminderType';


interface ReminderState {
  data: reminder[];
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
    setItems(state, action: PayloadAction<reminder[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<reminder>) {
      state.data.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.data = state.data.filter(items => items.id !== String(action.payload));
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, deleteItem, setLoading } = reminderSlice.actions;
export default reminderSlice.reducer;
