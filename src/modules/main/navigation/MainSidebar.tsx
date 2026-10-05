import { Boxes } from "lucide-react";
import { Link, NavLink } from "react-router";
import { mainNavigation } from "@/modules/main/navigation/main-navigation";
import ProfileDropdown from "../settings/components/profile-dropdown";

function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[--dashboard-border] p-4 md:w-60 md:border-b-0 md:border-r md:p-5">
      <Link to="/" className="mb-5 flex items-center gap-3 md:mb-10">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[--dashboard-foreground] text-[--dashboard-background]">
          <Boxes aria-hidden="true" size={19} />
        </span>
        <span className="font-heading text-lg font-bold">Dockyard</span>
      </Link>

      <p className="mb-2 hidden px-3 text-[11px] font-semibold uppercase text-[--dashboard-subtle] md:block">
        Workspace
      </p>
      <nav
        aria-label="Main navigation"
        className="flex gap-1 overflow-x-auto md:flex-col"
      >
        {mainNavigation.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[--dashboard-control] text-[--dashboard-foreground]"
                  : "text-[--dashboard-muted] hover:bg-[--dashboard-control] hover:text-[--dashboard-foreground]"
              }`
            }
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-3 border-t border-[--dashboard-border] pt-3 md:mt-auto md:pt-4">
        <ProfileDropdown />
      </div>
    </aside>
  );
}

export default Sidebar;
