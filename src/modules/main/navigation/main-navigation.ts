import {
  House,
  Folders,
  GitBranch,
  Pulse,
  GearFineIcon,
} from "@phosphor-icons/react";

export const mainNavigation = [
  { label: "Overview", to: "/", icon: House, end: true },
  { label: "Projects", to: "/projects", icon: Folders },
  { label: "Deployments", to: "/deployments", icon: GitBranch },
  { label: "Activity", to: "/activity", icon: Pulse },
  { label: "Settings", to: "/settings", icon: GearFineIcon },
];
