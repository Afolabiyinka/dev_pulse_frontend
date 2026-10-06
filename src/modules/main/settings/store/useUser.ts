import { create } from "zustand";
import type { UserResponse } from "../types/user.types";

interface UserStore {
  user: UserResponse | null;
  isAuthResolved: boolean;

  setUser: (user: UserResponse | null) => void;
  updateProfile: (
    profile: Pick<UserResponse, "github_name" | "avatar" | "github_username">,
  ) => void;
  setAuthResolved: (value: boolean) => void;

  logout: () => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  isAuthResolved: false,
  setUser: (u) => set({ user: u }),
  updateProfile: (profile) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...profile } : null,
    })),
  setAuthResolved: (value) => {
    set({ isAuthResolved: value });
  },
  logout: () => {
    set({ user: null });
    set({ isAuthResolved: true });
  },
}));
