import { useState, type ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CustomBtn from "@/components/custom/CustomBtn";

interface ProfileImageDialogProps {
  avatar: string;
  displayName: string;
  initials: string;
  onAvatarChange: (avatar: string) => void;
}

const ProfileImageDialog = ({
  avatar,
  displayName,
  initials,
  onAvatarChange,
}: ProfileImageDialogProps) => {
  const [open, setOpen] = useState(false);
  const [pendingAvatar, setPendingAvatar] = useState(avatar);
  const [error, setError] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setPendingAvatar(avatar);
      setError("");
    }
    setOpen(nextOpen);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPendingAvatar(reader.result);
        setError("");
      } else {
        setError("We couldn't read that image. Please try another file.");
      }
    };
    reader.onerror = () => {
      setError("We couldn't read that image. Please try another file.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <CustomBtn
          type="button"
          variant="secondary"
          size="sm"
          children="Change Image"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update profile picture</DialogTitle>
          <DialogDescription>
            Choose an image file up to 5 MB. This change is saved in this
            session only.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <Avatar size="lg" className="size-24">
            <AvatarImage
              src={pendingAvatar.trim() || undefined}
              alt={displayName}
            />
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Input
            id="avatar-file"
            type="file"
            accept="image/*"
            aria-label="Choose profile picture"
            aria-describedby="avatar-help"
            onChange={handleImageChange}
            className="h-auto rounded-xl py-2 file:mr-3 file:rounded-full file:border-0 file:bg-(--dashboard-control) file:px-3 file:py-2 file:text-sm file:font-medium file:text-(--dashboard-foreground)"
          />
          <p id="avatar-help" className="text-xs text-(--dashboard-muted)">
            Supported formats depend on your browser.
          </p>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <CustomBtn
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            children="Cancel"
          />
          <CustomBtn
            children="Use this image
"
            type="button"
            disabled={!pendingAvatar || Boolean(error)}
            onClick={() => {
              onAvatarChange(pendingAvatar);
              setOpen(false);
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageDialog;
