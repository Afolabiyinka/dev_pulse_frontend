import { Navigate, Outlet } from "react-router";
import Loadingcontainer from "@/components/custom/loadingcontainer";
import { useUser } from "./settings/store/useUser";
import Sidebar from "@/modules/main/navigation/Sidebar";

const MainRouteLayout = () => {
  const { isAuthResolved, user } = useUser();
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
          <div className="flex-1 p-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainRouteLayout;
