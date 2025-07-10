import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { aiInsightsType } from '../types/aiInsightsType';

<<<<<<< HEAD
interface AiInsightsState {
=======
interface aiInsightsState {
>>>>>>> 7671d8f (AI Insights List fronted)
  data: aiInsightsType[];
  loading: boolean;
}

<<<<<<< HEAD
const initialState: AiInsightsState = {
=======
const initialState: aiInsightsState = {
>>>>>>> 7671d8f (AI Insights List fronted)
  data: [],
  loading: false,
};

const aiInsightsSlice = createSlice({
  name: 'aiInsights',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<aiInsightsType[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<aiInsightsType>) {
      state.data.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
<<<<<<< HEAD
      state.data = state.data.filter(item => Number(item.id) !== action.payload);
=======
      state.data = state.data.filter(items => Number(items.id) !== action.payload);
>>>>>>> 7671d8f (AI Insights List fronted)
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, deleteItem, setLoading } = aiInsightsSlice.actions;
export default aiInsightsSlice.reducer;
<<<<<<< HEAD
=======

>>>>>>> 7671d8f (AI Insights List fronted)
