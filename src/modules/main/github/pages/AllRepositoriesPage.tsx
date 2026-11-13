import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  MagnifyingGlass,
  CircleNotch,
  ArrowsClockwise,
  GitBranch,
} from "@phosphor-icons/react";
import GitHubRepoCard, {
  GitHubReposSkeleton,
} from "../../components/githubrepo-card";
import { useGetGithubRepos } from "../hooks/useGetGithubRepos";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 12;

const AllRepositoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, isFetching, error, refetch } = useGetGithubRepos(
    currentPage,
    ITEMS_PER_PAGE,
  );

  const isContentLoading = loading || isFetching;
  const repos = useMemo(() => data?.repositories ?? [], [data?.repositories]);

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return repos;
    const q = searchQuery.toLowerCase();
    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(q) ||
        repo.full_name.toLowerCase().includes(q) ||
        repo.owner.login.toLowerCase().includes(q) ||
        (repo.description && repo.description.toLowerCase().includes(q)) ||
        (repo.language && repo.language.toLowerCase().includes(q)),
    );
  }, [repos, searchQuery]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || isContentLoading) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper for generating pagination numbers
  const paginationPages = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const current = currentPage;
    const hasMore = data?.has_more ?? false;
    const maxKnown = hasMore ? current + 1 : current;

    if (maxKnown <= 5) {
      for (let i = 1; i <= maxKnown; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push("ellipsis");
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(maxKnown, current + 1);
      for (let i = start; i <= end; i++) {
        if (i > 1 && i <= maxKnown) pages.push(i);
      }
      if (hasMore && end < maxKnown) {
        pages.push("ellipsis");
      }
    }
    return pages;
  }, [currentPage, data?.has_more]);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-7 pb-12">
      <div>
        <Link
          to="/"
          className="inline-flex min-h-9 items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" size={15} />
          <span>Overview</span>
        </Link>
      </div>

      <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Browse the GitHub repositories connected to your workspace.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:pb-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isContentLoading}
            className="min-h-10 gap-2"
          >
            <ArrowsClockwise
              aria-hidden="true"
              size={14}
              className={
                isContentLoading
                  ? "animate-spin motion-reduce:animate-none"
                  : ""
              }
            />
            <span>{isContentLoading ? "Refreshing" : "Refresh"}</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <label htmlFor="project-search" className="sr-only">
            Search repositories on this page
          </label>
          <MagnifyingGlass
            aria-hidden="true"
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="project-search"
            placeholder="Search this page"
            value={searchQuery}
            disabled={loading}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-11 rounded-xl border-border bg-muted/40 pl-10 pr-16 text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear repository search"
              className="absolute right-2 top-1/2 min-h-9 -translate-y-1/2 rounded-md px-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear
            </button>
          )}
        </div>
        <p
          aria-live="polite"
          className="text-sm text-muted-foreground sm:text-right"
        >
          {filteredRepos.length} of {repos.length} on this page
        </p>
      </div>

      {isContentLoading && (
        <div
          role="status"
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <CircleNotch
            aria-hidden="true"
            size={15}
            className="animate-spin motion-reduce:animate-none"
          />
          <span>{loading ? "Loading projects…" : "Updating projects…"}</span>
        </div>
      )}

      <div aria-busy={isContentLoading}>
        {loading ? (
          <GitHubReposSkeleton
            count={6}
            columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            showHeader={false}
          />
        ) : error ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center sm:p-10">
            <p className="text-base font-semibold text-destructive">
              Projects couldn’t be loaded.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check your connection, then try again.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="mt-4"
            >
              Try again
            </Button>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="space-y-4">
            {filteredRepos.map((repo) => (
              <GitHubRepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border  px-6 py-12 text-center">
            <GitBranch
              aria-hidden="true"
              size={36}
              className="text-muted-foreground"
            />
            <h2 className="mt-3 text-base font-semibold">
              {searchQuery ? "No matching projects" : "No projects yet"}
            </h2>
            <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
              {searchQuery
                ? `No repositories on this page match “${searchQuery}”.`
                : "Repositories connected to your GitHub account will appear here."}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>

      {!loading && !error && (
        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage}
            {data?.has_more && (
              <span className="ml-2">More projects available</span>
            )}
          </div>

          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={currentPage <= 1 || isContentLoading}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage <= 1 || isContentLoading
                      ? "pointer-events-none opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {paginationPages.map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === currentPage}
                      disabled={isContentLoading}
                      onClick={() => handlePageChange(p)}
                      className="cursor-pointer size-8"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  disabled={!data?.has_more || isContentLoading}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    !data?.has_more || isContentLoading
                      ? "pointer-events-none opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default AllRepositoriesPage;
