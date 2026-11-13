import { useState } from "react";
import { ArrowRight, GitBranch } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import GitHubRepoCard, {
  GitHubReposSkeleton,
} from "../../components/githubrepo-card";
import { useGetGithubRepos } from "../hooks/useGetGithubRepos";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface GithubReposProps {
  limit?: number;
}

const DASHBOARD_ITEMS_PER_PAGE = 3;

const GithubRepos = ({
  limit = DASHBOARD_ITEMS_PER_PAGE,
}: GithubReposProps) => {
  const navigate = useNavigate();
  const [dashboardPage, setDashboardPage] = useState(1);

  const {
    data: previewData,
    loading: previewLoading,
    error: previewError,
    refetch: refetchPreview,
  } = useGetGithubRepos(1, 10);

  const previewRepos = previewData?.repositories ?? [];
  const totalDashboardPages = Math.max(
    1,
    Math.ceil(previewRepos.length / limit),
  );
  const currentDashboardRepos = previewRepos.slice(
    (dashboardPage - 1) * limit,
    dashboardPage * limit,
  );

  if (previewLoading) {
    return <GitHubReposSkeleton count={3} />;
  }

  if (previewError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-sm font-medium text-destructive">
          Failed to load repositories.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Please check your connection and try again.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetchPreview()}
          className="mt-4 cursor-pointer"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (previewRepos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border  border-border p-8 text-center">
        <GitBranch size={32} className="text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold">No repositories found</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          No repositories synced with your GitHub account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            GitHub Repositories
          </h2>
          <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {previewRepos.length}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/projects")}
          className="cursor-pointer gap-1.5"
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* List view cards */}
      <div className="space-y-4">
        {currentDashboardRepos.map((repo) => (
          <GitHubRepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* Dashboard Pagination & Full Page Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {totalDashboardPages > 1 ? (
          <Pagination className="mx-0 w-auto justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={dashboardPage <= 1}
                  onClick={() => setDashboardPage((p) => Math.max(1, p - 1))}
                  className={
                    dashboardPage <= 1
                      ? "pointer-events-none opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalDashboardPages }, (_, i) => i + 1).map(
                (p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === dashboardPage}
                      onClick={() => setDashboardPage(p)}
                      className="cursor-pointer size-8"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  disabled={dashboardPage >= totalDashboardPages}
                  onClick={() =>
                    setDashboardPage((p) =>
                      Math.min(totalDashboardPages, p + 1),
                    )
                  }
                  className={
                    dashboardPage >= totalDashboardPages
                      ? "pointer-events-none opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : (
          <div />
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/projects")}
          className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
        >
          <span>View all repositories</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default GithubRepos;
