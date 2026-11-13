import { Link } from "react-router";
import { ArrowRight, Folders, GitBranch } from "@phosphor-icons/react";
import GithubRepos from "../../github/pages/GithubRepos";

const shortcuts = [
  {
    title: "Projects",
    description: "Organize the codebases in your workspace.",
    to: "/projects",
    icon: Folders,
  },
  {
    title: "Deployments",
    description: "Keep an eye on your latest releases.",
    to: "/deployments",
    icon: GitBranch,
  },
];

const Dashboard = () => (
  <section className="mx-auto w-full max-w-6xl">
    <header className="mb-8 flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Overview
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Your repositories and workspace tools, together.
        </p>
      </div>

      <nav
        aria-label="Workspace shortcuts"
        className="flex flex-wrap gap-2 sm:justify-end"
      >
        {shortcuts.map(({ title, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-muted px-3.5 text-sm font-medium outline-none transition-colors hover:bg-muted/50
             active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Icon aria-hidden="true" size={18} />
            <span>{title}</span>
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        ))}
      </nav>
    </header>

    <div className="space-y-8">
      <GithubRepos />
    </div>
  </section>
);

export default Dashboard;
