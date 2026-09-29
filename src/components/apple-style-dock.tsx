import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import ThemeToggle from "@/modules/theme/theme-toggle";
import {
  ActivityIcon,
  HouseIcon,
  MailboxIcon,
  PackageIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { DockerIcon } from "./custom/iconwrapper";
import { NavLink } from "react-router";

const items = [
  { title: "Home", icon: HouseIcon, path: "/" },
  { title: "Images", icon: PackageIcon, path: "/images" },
  { title: "Deployments", icon: DockerIcon, path: "/deployments" },
  { title: "Activity", icon: ActivityIcon, path: "/activity" },
  { title: "Change Log", icon: ScrollIcon, path: "/changelog" },
  { title: "Inbox", icon: MailboxIcon, path: "/inbox" },
];

export function AppleStyleDock() {
  return (
    <div className="absolute bottom-4 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end  pb-3 shadow-none ring-0">
        {items.map(({ title, icon: Icon, path }) => (
          <NavLink
            key={title}
            to={path}
            end={path === "/"}
            className="rounded-xl"
            aria-label={title}
          >
            {({ isActive }) => (
              <DockItem
                className={`aspect-square rounded-xl border transition-colors ${isActive ? "border-[#d9f36b] bg-[#d9f36b]/15 text-[#d9f36b]" : "border-border"}`}
              >
                <DockLabel>{title}</DockLabel>
                <DockIcon>
                  <Icon className="h-full w-full" />
                </DockIcon>
              </DockItem>
            )}
          </NavLink>
        ))}
        <DockItem className="aspect-square rounded-xl border border-border">
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <ThemeToggle />
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
