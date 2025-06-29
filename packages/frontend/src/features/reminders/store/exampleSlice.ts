import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import reminderType from '../types/tipType';


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
    setItems(state, action: PayloadAction<reminderType[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<reminderType>) {
      state.data.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.data = state.data.filter(items => items.id !== (action.payload).toString());
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, deleteItem, setLoading } = reminderSlice.actions;
export default reminderSlice.reducer;
