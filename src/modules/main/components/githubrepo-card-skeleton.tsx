import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubRepoCardSkeletonProps {
  className?: string;
}

export const GitHubRepoCardSkeleton = ({
  className,
}: GitHubRepoCardSkeletonProps) => {
  return (
    <article
      className={cn(
        "flex h-full min-h-[220px] flex-col rounded-2xl border bg-card/60 p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-5 w-3/5 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-5 w-14 rounded-full shrink-0" />
      </div>

      <div className="mt-5 min-h-10 space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-4/5 rounded-md" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-10 rounded-md" />
        <Skeleton className="h-4 w-10 rounded-md" />
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
        <Skeleton className="h-3.5 w-24 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>
    </article>
  );
};

interface GitHubReposSkeletonProps {
  count?: number;
  columns?: string;
  showHeader?: boolean;
  className?: string;
}

export const GitHubReposSkeleton = ({
  count = 3,
  columns = "grid-cols-1",
  showHeader = true,
  className,
}: GitHubReposSkeletonProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      )}

      <div className={cn("grid gap-4", columns)}>
        {Array.from({ length: count }).map((_, i) => (
          <GitHubRepoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default GitHubRepoCardSkeleton;
