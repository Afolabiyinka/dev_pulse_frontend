import type { RouteObject } from "react-router";
import MainRouteLayout from "@/modules/main/MainRouteLayout";
import Dashboard from "@/modules/main/dashboard/pages/Dashboard";
import SettingsPage from "@/modules/main/dashboard/pages/SettingsPage";
import WorkspacePage from "@/modules/main/dashboard/pages/WorkspacePage";

export const mainRoutes: RouteObject[] = [
  {
    path: "/",
    Component: MainRouteLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "projects", Component: WorkspacePage },
      { path: "deployments", Component: WorkspacePage },
      { path: "activity", Component: WorkspacePage },
      { path: "settings", Component: SettingsPage },
    ],
  },
];
