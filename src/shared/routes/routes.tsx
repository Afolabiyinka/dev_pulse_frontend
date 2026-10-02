import Login from "@/modules/auth/pages/Login";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";
import SignUp from "@/modules/auth/pages/SignUp";
import MainLayout from "@/modules/MainLayout";
import Dashboard from "@/modules/main/pages/Dashboard";
import WorkspacePage from "@/modules/main/pages/WorkspacePage";
import { Navigate, type RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "projects", Component: WorkspacePage },
      { path: "deployments", Component: WorkspacePage },
      { path: "activity", Component: WorkspacePage },
      { path: "settings", Component: WorkspacePage },
    ],
  },
  {
    path: "auth",
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
