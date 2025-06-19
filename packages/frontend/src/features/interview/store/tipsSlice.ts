import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TipsState {
  shownTips: string[]; 
}

const initialState: TipsState = {
  shownTips: [],
};

export const tipsSlice = createSlice({
  name: 'shownTips',
  initialState,
  reducers: {
    addShownTip: (state, action: PayloadAction<string>) => {
      state.shownTips.push(action.payload);
    },
    resetShownTips: (state) => {
      state.shownTips = [];
    },
    setShownTips: (state, action: PayloadAction<string[]>) => {
      state.shownTips = action.payload;
    },
  },
});

export const { addShownTip, resetShownTips, setShownTips } = tipsSlice.actions;
export default tipsSlice.reducer;
