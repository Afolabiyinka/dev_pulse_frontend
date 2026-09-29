import { AppleStyleDock } from "@/components/apple-style-dock";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="h-screen p-2">
      <div className="border bg-muted h-full w-full rounded-3xl flex items-center justify-center">
        <Outlet />
      </div>
      <AppleStyleDock />
    </div>
  );
};

export default MainLayout;
