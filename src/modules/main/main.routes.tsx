import type { RouteObject } from "react-router";
import MainRouteLayout from "@/modules/main/MainRouteLayout";
import Dashboard from "@/modules/main/dashboard/pages/Dashboard";
import SettingsPage from "@/modules/main/dashboard/pages/SettingsPage";
import FeatureInDevelopment from "../ComingSoon";

export const mainRoutes: RouteObject[] = [
  {
    path: "/",
    Component: MainRouteLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "projects", Component: FeatureInDevelopment },
      { path: "deployments", Component: FeatureInDevelopment },
      { path: "activity", Component: FeatureInDevelopment },
      { path: "settings", Component: SettingsPage },
    ],
  },
];
