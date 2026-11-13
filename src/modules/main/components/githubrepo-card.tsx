import {
  Star,
  GitFork,
  ArrowSquareOut,
  LockKey,
  GithubLogo,
  Circle,
} from "@phosphor-icons/react";
import type { GitHubRepository } from "../github/github.types";

interface GitHubRepoCardProps {
  repo: GitHubRepository;
}

const GitHubRepoCard = ({ repo }: GitHubRepoCardProps) => {
  return (
    <article className="group flex w-full flex-col gap-4 rounded-2xl border border-border/80 bg-card/60 p-4 transition-colors hover:border-muted-foreground/35 hover:bg-card sm:p-5">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-foreground">
            <GithubLogo aria-hidden="true" size={21} weight="fill" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">
              {repo.owner.login}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block truncate font-semibold text-foreground outline-none transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
            >
              {repo.name}
            </a>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          {repo.private ? <LockKey aria-hidden="true" size={13} /> : null}
          {repo.private ? "Private" : "Public"}
        </span>
      </header>

      <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
        {repo.description || "No description yet."}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <Circle
                aria-hidden="true"
                size={9}
                weight="fill"
                className="text-primary"
              />
              {repo.language}
            </span>
          )}

          <span
            className="flex items-center gap-1.5"
            aria-label={`${repo.stargazers_count} stars`}
          >
            <Star aria-hidden="true" size={15} />
            {repo.stargazers_count}
          </span>

          <span
            className="flex items-center gap-1.5"
            aria-label={`${repo.forks_count} forks`}
          >
            <GitFork aria-hidden="true" size={15} />
            {repo.forks_count}
          </span>
          {repo.fork && (
            <span className="flex items-center gap-1.5">
              <GitFork aria-hidden="true" size={14} />
              Fork
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="truncate text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime={repo.updated_at}>
              {new Date(repo.updated_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </span>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${repo.full_name} on GitHub`}
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-foreground outline-none transition-colors hover:bg-muted active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none"
          >
            Open
            <ArrowSquareOut aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default GitHubRepoCard;
export {
  GitHubRepoCardSkeleton,
  GitHubReposSkeleton,
} from "./githubrepo-card-skeleton";
