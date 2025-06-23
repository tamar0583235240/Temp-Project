// store/progressSlice.ts
import { create } from "zustand";
interface User {
  id: string;
  firstName: string;
  lastName: string;
  // שדות נוספים אם צריך
}


interface UserState {
  userId?: string;
  setUserId: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: undefined,
  setUserId: (id) => set({ userId: id }),
}));
