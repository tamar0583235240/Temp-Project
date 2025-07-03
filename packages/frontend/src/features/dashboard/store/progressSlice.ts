import { create } from "zustand";

// ממשק (interface) שמתאר את מבנה ה־store
interface UserState {
  userId?: string;            // מזהה המשתמש
  fullName?: string;          // שם מלא
  answered?: number;          // מספר שאלות שנענו
  total: number;             // מספר שאלות כולל
  setUserId: (id: string) => void;
  setFullName: (name: string) => void;
  setAnswered: (count: number) => void;
  setTotal: (count: number) => void;
}

// יצירת ה־store עם Zustand
export const useUserStore = create<UserState>((set) => ({
  userId: undefined,
  fullName: undefined,
  answered: undefined,
  total: 0,
  setUserId: (id) => set({ userId: id }),
  setFullName: (name) => set({ fullName: name }),
  setAnswered: (count) => set({ answered: count }),
  setTotal: (count) => set({ total: count }),
}));
