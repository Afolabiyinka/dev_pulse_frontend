import React from "react";
import { Toaster } from "sonner";
import RoutesConfig from "./shared/routes/routes-config";
import { useTheme } from "./modules/theme/useTheme";

const App = () => {
  const { theme } = useTheme();

  console.log(navigator.geolocation);

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
            "--normal-bg": "var(--card)",
            "--normal-text": "var(--card-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "9999px",
          } as React.CSSProperties
        }
        toastOptions={{
          classNames: {
            toast:
              "border border-border  rounded-full shadow-lg ring-1 ring-foreground/5",
            title: "text-sm font-semibold text-card-foreground",
            description: "text-xs leading-relaxed text-muted-foreground",
            actionButton:
              "rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
            cancelButton:
              "rounded-md bg-muted text-muted-foreground hover:bg-accent",
            closeButton:
              "border-border bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          },
        }}
      />
    </div>
  );
};

export default App;
