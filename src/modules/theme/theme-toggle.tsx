import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "./useTheme";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};

export default ThemeToggle;
