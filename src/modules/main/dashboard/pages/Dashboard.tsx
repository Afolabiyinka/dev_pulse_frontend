import {
  ArrowRight,
  Boxes,
  Folders,
  FolderArchiveIcon,
  Workflow,
} from "lucide-react";
import { Link } from "react-router";

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
    icon: Workflow,
  },
];

const Dashboard = () => (
  <section className="mx-auto w-full max-w-5xl">
    <div className="mb-9">
      <p className="mb-2 text-sm font-medium text-[var(--dashboard-muted)]">
        Your workspace
      </p>
      <h1 className="font-heading text-3xl font-bold tracking-normal">
        A clear view of what you are building.
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--dashboard-muted)]">
        Your projects and deployment activity will live here as you get set up.
      </p>
    </div>

    <div className="grid gap-3 sm:grid-cols-2">
      {shortcuts.map(({ title, description, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="group flex min-h-36 items-start justify-between rounded-xl border border-[var(--dashboard-border)] p-5 transition-colors hover:bg-[var(--dashboard-control)]"
        >
          <div>
            <span className="mb-5 flex size-9 items-center justify-center rounded-lg bg-[var(--dashboard-control)] text-[var(--dashboard-foreground)]">
              <Icon aria-hidden="true" size={18} />
            </span>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-[var(--dashboard-muted)]">
              {description}
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mt-1 text-[var(--dashboard-subtle)] transition-transform group-hover:translate-x-1"
            size={17}
          />
        </Link>
      ))}
    </div>
  </section>
);

export default Dashboard;
