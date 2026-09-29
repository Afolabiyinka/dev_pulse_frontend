import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function getTheme() {
  const stored = localStorage.getItem("theme");
  return stored ? (JSON.parse(stored) as Theme) : "light";
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: getTheme(),
  setTheme: (theme) => {
    set({ theme: theme });
    localStorage.setItem("theme", JSON.stringify(theme));
  },
}));
