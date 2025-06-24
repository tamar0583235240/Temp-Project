import { create } from "zustand";

interface UserState {
  userId?: string;
  fullName?: string;
  setUserId: (id: string) => void;
  setFullName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: undefined,
  fullName: undefined,
  setUserId: (id) => set({ userId: id }),
  setFullName: (name) => set({ fullName: name }),
}));
