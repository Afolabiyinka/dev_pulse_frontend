import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { mainNavigation } from "@/modules/main/navigation/main-navigation";

export function AppleStyleDock() {
  return (
    <nav
      aria-label="Main"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-50 max-w-full -translate-x-1/2"
    >
      <div className="flex items-center gap-5 rounded-2xl border border-border/60 bg-background/80 p-2 shadow-lg shadow-black/10 backdrop-blur-xl">
        {mainNavigation.map(({ label, icon: Icon, to, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            aria-label={label}
            title={label}
            className={({ isActive }) =>
              `relative flex h-12 items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  focus-visible:ring-offset-background ${
                isActive
                  ? "px-3"
                  : "w-14 justify-center text-muted-foreground hover:bg-primary/50 hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="dock-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon
                  className="relative size-6 shrink-0 text-foreground"
                  // weight={isActive ? "fill" : "regular"}
                />
                {isActive && (
                  <span className="relative text-sm font-medium whitespace-nowrap">
                    {label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
