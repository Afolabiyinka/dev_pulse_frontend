import {
  Activity,
  Boxes,
  LayoutDashboard,
  Settings2,
  Workflow,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import ThemeToggle from "@/modules/theme/theme-toggle";

const navigation = [
  { label: "Overview", to: "/", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/projects", icon: Boxes },
  { label: "Deployments", to: "/deployments", icon: Workflow },
  { label: "Activity", to: "/activity", icon: Activity },
  { label: "Settings", to: "/settings", icon: Settings2 },
];

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/projects": "Projects",
  "/deployments": "Deployments",
  "/activity": "Activity",
  "/settings": "Settings",
};

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="dockyard-dashboard min-h-screen p-3">
      <div className="flex min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-2xl border border-[var(--dashboard-border)] bg-[var(--dashboard-card)] md:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-[var(--dashboard-border)] p-4 md:w-60 md:border-b-0 md:border-r md:p-5">
          <Link to="/" className="mb-5 flex items-center gap-3 md:mb-10">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--dashboard-foreground)] text-[var(--dashboard-background)]">
              <Boxes aria-hidden="true" size={19} />
            </span>
            <span className="font-heading text-lg font-bold">Dockyard</span>
          </Link>

          <p className="mb-2 hidden px-3 text-[11px] font-semibold uppercase text-[var(--dashboard-subtle)] md:block">
            Workspace
          </p>
          <nav
            aria-label="Main navigation"
            className="flex gap-1 overflow-x-auto md:flex-col"
          >
            {navigation.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--dashboard-control)] text-[var(--dashboard-foreground)]"
                      : "text-[var(--dashboard-muted)] hover:bg-[var(--dashboard-control)] hover:text-[var(--dashboard-foreground)]"
                  }`
                }
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-3 border-t border-[var(--dashboard-border)] pt-3 md:mt-auto md:pt-4">
            <ThemeToggle />
            <p className="mt-3 hidden px-3 text-xs text-[var(--dashboard-muted)] md:block">
              Dockyard workspace
            </p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center border-b border-[var(--dashboard-border)] px-5 md:px-8">
            <p className="text-sm font-semibold">
              {pageTitles[pathname] ?? "Workspace"}
            </p>
          </header>
          <div className="flex-1 p-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
