import Login from "@/modules/auth/pages/Login";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";
import SignUp from "@/modules/auth/pages/SignUp";
import { Navigate, type RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
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
  },
];
