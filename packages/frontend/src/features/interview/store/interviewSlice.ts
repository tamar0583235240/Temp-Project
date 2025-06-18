import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { interviewType } from '../types/interviewType';

interface InterviewState {
  data: interviewType[];
  currentIndex: number;
  loading: boolean;
}

// const initialState: InterviewState = {
//   data: [],
//   currentIndex: 0,
//   loading: false,
// };
const initialState: InterviewState = {
  data: [
    {
      id: 1,
      title: "מה זה useState?",
      content: "useState הוא Hook שמאפשר לך להוסיף state לקומפוננטות פונקציונליות ב-React.",
      category: "React",
      tips: "נסה לנהל את ה-state בצורה מינימלית ונקייה.",
      aiGuidance: "התמקד בהסבר מתי ואיך להשתמש ב-useState.",
      isActive: true,
    },
    {
      id: 2,
      title: "הסבר את ההבדל בין props ו-state",
      content: "props מועברים מההורה, בעוד ש-state הוא פנימי לקומפוננטה.",
      category: "React",
      tips: "השתמש ב-props להעברת נתונים בין קומפוננטות.",
      aiGuidance: "תן דוגמה לקומפוננטת ילד שמקבלת props.",
      isActive: true,
    },
    {
      id: 3,
      title: "מה זה Redux?",
      content: "Redux הוא ספרייה לניהול state גלובלי באפליקציות JavaScript.",
      category: "State Management",
      tips: "השתמש ב-Redux רק כאשר האפליקציה דורשת ניהול state מורכב.",
      aiGuidance: "ציין את המושגים המרכזיים כמו action, reducer, store.",
      isActive: true,
    },
  ],
  loading: false,
  currentIndex: 0
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
