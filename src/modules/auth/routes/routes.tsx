import { Navigate, type RouteObject } from "react-router";
import ForgotPassword from "@/modules/auth/pages/ForgotPassword";
import Login from "@/modules/auth/pages/Login";
import SignUp from "@/modules/auth/pages/SignUp";

export const authRoutes: RouteObject[] = [
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
];
