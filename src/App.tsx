import React from "react";
import { Toaster } from "sonner";
import RoutesConfig from "./shared/routes/routes-config";
import { useTheme } from "./modules/theme/useTheme";
import { useFetchUser } from "./modules/main/settings/hooks/useFetchUser";
import { useUser } from "./modules/main/settings/store/useUser";
import { toastOptions } from "./shared/lib/toastOptions";

const App = () => {
  const { theme } = useTheme();
  const { fetchedUser, loading } = useFetchUser();
  const { setUser, setAuthResolved } = useUser();

  React.useEffect(() => {
    if (!loading) {
      setUser(fetchedUser || null);
      setAuthResolved(true);
    }
  }, [fetchedUser, loading, setUser, setAuthResolved]);

  React.useEffect(() => {
    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.body.classList.remove("light", "dark");
    document.body.classList.add(appliedTheme);
  }, [theme]);
  return (
    <div>
      <RoutesConfig />
      <Toaster
        theme={theme}
        position="top-center"
        richColors
        closeButton
        visibleToasts={4}
        gap={10}
        offset={20}
        duration={4500}
        style={
          {
            "--border-radius": "9999px",
          } as React.CSSProperties
        }
        toastOptions={toastOptions}
      />
    </div>
  );
};

export default App;
