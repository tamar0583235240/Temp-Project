// store/progressSlice.ts
import { create } from 'zustand';

interface ProgressState {
  userId: string | null;
  answered: number;
  total: number;
  setUserId: (id: string) => void;
  setProgress: (answered: number, total: number) => void;
}

export const useUserStore = create<ProgressState>((set) => ({
  userId: null,
  answered: 0,
  total: 0,
  setUserId: (id) => set({ userId: id }),
  setProgress: (answered, total) => set({ answered, total }),
}));
