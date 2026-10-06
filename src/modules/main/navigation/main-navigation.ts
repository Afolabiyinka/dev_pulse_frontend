import {
  Activity,
  Folders,
  Settings2,
  Workflow,
  Home
} from "lucide-react";

export const mainNavigation = [
  { label: "Overview", to: "/", icon: Home, end: true },
  { label: "Projects", to: "/projects", icon: Folders },
  { label: "Deployments", to: "/deployments", icon: Workflow },
  { label: "Activity", to: "/activity", icon: Activity },
  { label: "Settings", to: "/settings", icon: Settings2 },
];
