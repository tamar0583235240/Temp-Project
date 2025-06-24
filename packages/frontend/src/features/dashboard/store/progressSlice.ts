import { create } from 'zustand';

interface UserState {
  userId?: string;
  fullName?: string;
  answered: number;
  total: number;
  setUserId: (id: string) => void;
  setFullName: (name: string) => void;
  setProgress: (answered: number, total: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: undefined,
  fullName: undefined,
  answered: 0,
  total: 0,
  setUserId: (id) => set({ userId: id }),
  setFullName: (name) => set({ fullName: name }),
  setProgress: (answered, total) => set({ answered, total }),
}));
