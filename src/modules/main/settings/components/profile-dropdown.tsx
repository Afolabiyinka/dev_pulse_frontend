import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown, LogOut } from "lucide-react";
import ThemeToggle from "@/modules/theme/theme-toggle";
import { useUser } from "../store/useUser";

const ProfileDropdown = () => {
  const user = useUser((state) => state.user);
  const initial = user?.github_username?.[0]?.toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted">
        <Avatar className="size-9 rounded-xl">
          <AvatarImage
            src={user?.avatar || ""}
            alt={user?.github_username || "User Avatar"}
          />
          <AvatarFallback className="rounded-xl bg-primary/10 text-sm font-medium text-primary">
            {initial}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight">
            {user?.github_name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            @{user?.github_username}
          </p>
        </div>

        <ChevronsUpDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl p-1.5 shadow-lg"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
          Signed in as @{user?.github_username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer rounded-xl px-2 py-2"
        >
          <ThemeToggle />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2 rounded-xl px-2 py-2"
        >
          <LogOut className="size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
