import { Navigate, Outlet } from "react-router";
import Loadingcontainer from "@/components/custom/loadingcontainer";
import { useUser } from "./settings/store/useUser";
import LinkBrand from "@/components/custom/logo";
import ProfileDropdown from "@/modules/main/settings/components/profile-dropdown";
import { AppleStyleDock } from "@/components/apple-style-dock";

const MainRouteLayout = () => {
  const { isAuthResolved, user } = useUser();
  if (!isAuthResolved) {
    return <Loadingcontainer />;
  }

  if (!user) {
    return <Navigate to={`/auth/login`} />;
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-muted/40 p-0 text-foreground md:p-3">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-none bg-background md:rounded-2xl">
        <header className="z-10 flex shrink-0 items-center justify-between border-b border-border/70 px-4 py-3 sm:px-6">
          <LinkBrand />
          <div className="ml-4">
            <ProfileDropdown compact />
          </div>
        </header>

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-screen-2xl px-5 pb-32 pt-6 md:px-8 md:pb-36 md:pt-8">
            <Outlet />
          </div>
        </main>
        <AppleStyleDock />
      </div>
    </div>
  );
};

export default MainRouteLayout;
