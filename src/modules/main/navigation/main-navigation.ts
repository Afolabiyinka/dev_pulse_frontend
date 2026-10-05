import {
  Activity,
  Folders,
  LayoutDashboard,
  Settings2,
  Workflow,
} from "lucide-react";

export const mainNavigation = [
  { label: "Overview", to: "/", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/projects", icon: Folders },
  { label: "Deployments", to: "/deployments", icon: Workflow },
  { label: "Activity", to: "/activity", icon: Activity },
  { label: "Settings", to: "/settings", icon: Settings2 },
];
