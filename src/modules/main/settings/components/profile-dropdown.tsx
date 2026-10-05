import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/modules/theme/theme-toggle";
import { useFetchUser } from "../useFetchUser";

const ProfileDropdown = () => {
  const { fetchedUser } = useFetchUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-3 rounded-lg w-full border px-4">
        <span className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={fetchedUser?.avatar || ""}
              alt={fetchedUser?.github_username || "User Avatar"}
            />
            <AvatarFallback>
              {fetchedUser?.github_username?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm tracking-wide">{fetchedUser?.github_name}</p>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) p-2">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="text-destructive focus:text-destructive"
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
