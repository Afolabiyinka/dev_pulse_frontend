import { useState, type FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileImageDialog from "@/modules/main/settings/components/ProfileImageDialog";
import { useUser } from "@/modules/main/settings/store/useUser";

const SettingsPage = () => {
  const user = useUser((state) => state.user);
  const updateProfile = useUser((state) => state.updateProfile);
  const [githubName, setGithubName] = useState(user?.github_name ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [githubUsername, setGithubUsername] = useState(
    user?.github_username ?? "",
  );

  const displayName = githubName || githubUsername || "Your profile";
  const initials = (displayName[0] || user?.email?.[0] || "U").toUpperCase();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile({
      github_name: githubName.trim() || null,
      avatar: avatar.trim() || null,
      github_username: githubUsername.trim() || null,
    });
  };

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-normal">
          Settings
        </h1>
        <p className="mt-3 text-sm leading-6 text-(--dashboard-muted)">
          Update your profile details. Changes are saved in this session only.
        </p>
      </div>

      <section
        aria-labelledby="profile-heading"
        className="overflow-hidden rounded-2xl border border-(--dashboard-border)"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 border-b border-(--dashboard-border) p-5 md:p-6">
            <Avatar size="lg" className="size-16">
              <AvatarImage src={avatar.trim() || undefined} alt={displayName} />
              <AvatarFallback className="text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h2
                id="profile-heading"
                className="truncate text-base font-semibold"
              >
                {displayName}
              </h2>
              <p className="mt-1 text-sm text-(--dashboard-muted)">
                {user?.email || "Account profile"}
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 md:p-6">
            <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center">
              <label htmlFor="github-name" className="text-sm font-medium">
                GitHub name
              </label>
              <Input
                id="github-name"
                autoComplete="name"
                value={githubName}
                onChange={(event) => setGithubName(event.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center">
              <label htmlFor="github-username" className="text-sm font-medium">
                GitHub username
              </label>
              <Input
                id="github-username"
                autoComplete="username"
                value={githubUsername}
                onChange={(event) => setGithubUsername(event.target.value)}
                placeholder="username"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center">
              <span className="text-sm font-medium">Profile picture</span>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={avatar.trim() || undefined} alt={displayName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <ProfileImageDialog
                  avatar={avatar}
                  displayName={displayName}
                  initials={initials}
                  onAvatarChange={setAvatar}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-(--dashboard-border) pt-5">
              <Button type="submit" size="lg">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default SettingsPage;
