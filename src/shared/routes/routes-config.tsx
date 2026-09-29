import { RouterProvider, createBrowserRouter } from "react-router";
import { routes } from "./routes";
const RoutesConfig = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default RoutesConfig;
