// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface FiltersState {
//   topicId: string;
//   difficulty: string;
//   type: string;
//   generatedByAi: boolean;
//   search: string;
// }

// const initialState: FiltersState = {
//   topicId: "",
//   difficulty: "",
//   type: "",
//   generatedByAi: false,
//   search: "",
// };

// const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setFilter<K extends keyof FiltersState>(
//       state: FiltersState,
//       action: PayloadAction<{ key: K; value: FiltersState[K] }>
//     ) {
//       state[action.payload.key] = action.payload.value;
//     },
//     resetFilters() {
//       return initialState;
//     },
//     setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
//       return { ...state, ...action.payload };
//     },
//   },
// });

// export const { setFilter, resetFilters, setFilters } = filtersSlice.actions;
// export default filtersSlice.reducer;
