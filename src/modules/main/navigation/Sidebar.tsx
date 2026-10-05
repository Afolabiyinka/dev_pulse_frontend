import { NavLink, useLocation } from "react-router";
import { mainNavigation } from "@/modules/main/navigation/main-navigation";
import { motion } from "framer-motion";
import ProfileDropdown from "../settings/components/profile-dropdown";
import LinkBrand from "@/components/custom/logo";

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="flex w-full shrink-0 flex-col border-b p-4 md:w-64 md:border-b-0 md:border-r md:p-5 gap-3">
      <LinkBrand />

      <p className="mb-2 mt-10 hidden px-3 text-[11px] font-semibold uppercase text-[--dashboard-subtle] md:block">
        Workspace
      </p>
      <nav
        aria-label="Main navigation"
        className="flex gap-3 overflow-auto p-1 md:flex-col"
      >
        {mainNavigation.map(({ icon: Icon, label, to }) => {
          const isActive = location.pathname === to;
          return (
            <motion.div
              key={to}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <NavLink
                to={to}
                className={`relative isolate flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-base transition-colors ${
                  isActive ? "text-white" : "hover:bg-muted"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-bg"
                    className="absolute inset-0 -z-10 rounded-xl bg-primary/80"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="h-4.5 w-4.5 stroke-[1.5px]" />
                <p>{label}</p>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <div className="mt-3 border-t border-[--dashboard-border] pt-3 md:mt-auto md:pt-4">
        <ProfileDropdown />
      </div>
    </aside>
  );
}

export default Sidebar;
