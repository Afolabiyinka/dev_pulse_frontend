import { RefreshCw, WifiOff, FrownIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  action?: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  icon?: LucideIcon;
  buttonIcon?: LucideIcon;
}

const ErrorPage = ({
  action,
  title,
  message,
  buttonText = "Try again",
  icon,
  buttonIcon,
}: ErrorPageProps) => {
  const offline = !navigator.onLine;

  const Icon = icon ?? (offline ? WifiOff : FrownIcon);
  const ButtonIcon = buttonIcon ?? RefreshCw;

  const finalTitle =
    title ?? (offline ? "No internet" : "Something went wrong");
  const finalMessage =
    message ??
    (offline
      ? "You're not connected to the internet. Check your connection and try again."
      : "We couldn't load your data. Your information is safe. Please try again.");

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-7 w-7 text-muted-foreground" />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight font-heading">
          {finalTitle}
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {finalMessage}
        </p>

        <Button onClick={action} className="mt-6 gap-2" size="lg">
          <ButtonIcon className="h-4 w-4" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
