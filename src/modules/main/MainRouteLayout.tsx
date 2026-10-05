import { Navigate, Outlet, useLocation } from "react-router";
import { mainNavigation } from "@/modules/main/navigation/main-navigation";
import Loadingcontainer from "@/components/custom/loadingcontainer";
import { useUser } from "./settings/store/useUser";
import Sidebar from "@/modules/main/navigation/Sidebar";

const MainRouteLayout = () => {
  const { pathname } = useLocation();
  const { isAuthResolved, user } = useUser();
  const pageTitle =
    mainNavigation.find(({ to }) => to === pathname)?.label ?? "Workspace";

  if (!isAuthResolved) {
    return <Loadingcontainer />;
  }

  if (!user) {
    return <Navigate to={`/auth/login`} />;
  }

  return (
    <div className="min-h-screen bg-[--dashboard-background] p-3 text-[--dashboard-foreground]">
      <div className="flex min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-2xl  bg-background md:flex-row">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center border-b  px-5 md:px-8">
            <p className="text-LG font-semibold">{pageTitle}</p>
          </header>
          <div className="flex-1 p-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainRouteLayout;
