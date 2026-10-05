import { authRoutes } from "@/modules/auth/auth.routes";
import { mainRoutes } from "@/modules/main/main.routes";
import NotFound from "@/modules/NotFound";
import { type RouteObject } from "react-router";

export const routes: RouteObject[] = [
  ...mainRoutes,
  ...authRoutes,
  {
    path: "*",
    Component: NotFound,
  },
];
