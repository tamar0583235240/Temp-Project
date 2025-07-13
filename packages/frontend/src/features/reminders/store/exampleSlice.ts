// exampleSlice.ts
// import { createSlice } from '@reduxjs/toolkit';

// const exampleSlice = createSlice({
//     name: 'example',
//     initialState: {},
//     reducers: {},
// });
// export default exampleSlice.reducer; // ייצוא של הרדוסר
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { reminderType } from '../types/reminderType';


// interface ExampleState {
//   data: reminderType[];
//   loading: boolean;
// }

// const initialState: ExampleState = {
//   data: [],
//   loading: false,
// };

// const reminderSlice = createSlice({
//   name: 'example',
//   initialState,
//   reducers: {
//     setItems(state, action: PayloadAction<reminderType[]>) {
//       state.data = action.payload;
//     },
//     addItem(state, action: PayloadAction<reminderType>) {
//       state.data.push(action.payload);
//     },
//     deleteItem(state, action: PayloadAction<number>) {
//       state.data = state.data.filter(items => items.exampleField1 !== action.payload);
//     },
//     setLoading(state, action: PayloadAction<boolean>) {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setItems, addItem, deleteItem, setLoading } = reminderSlice.actions;
// export default reminderSlice.reducer;

// src/features/example/exampleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReminderSetting } from '../types/reminderType';

interface ExampleState {
  data: UserReminderSetting[];
  loading: boolean;
}

const initialState: ExampleState = {
  data: [],
  loading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<UserReminderSetting[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<UserReminderSetting>) {
      state.data.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// ייצוא ה־actions לשימוש בקומפוננטות
export const { setItems, addItem, deleteItem, setLoading } = exampleSlice.actions;

// ייצוא ה־reducer לשימוש ב־store
export default exampleSlice.reducer;
