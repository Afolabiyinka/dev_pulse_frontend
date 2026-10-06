import { ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./useTheme";
import CustomBtn from "@/components/custom/CustomBtn";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const ThemeIcon =
    theme === "dark" ? Moon : theme === "system" ? Monitor : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CustomBtn
          children={
            <>
              <ThemeIcon aria-hidden="true" size={17} />
              <span className="capitalize">{theme}</span>
              <ChevronDown aria-hidden="true" className="ml-auto" size={15} />
            </>
          }
          type="button"
          variant="secondary"
          aria-label="Choose color theme"
          className="w-full justify-between gap-3 rounded-lg text-[--dashboard-muted] hover:bg-[--dashboard-control] hover:text-[--dashboard-foreground]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-48">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) =>
            setTheme(value as "light" | "dark" | "system")
          }
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
