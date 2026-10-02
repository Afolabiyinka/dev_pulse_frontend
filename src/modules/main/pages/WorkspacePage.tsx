import { useLocation } from "react-router";

const pageDetails: Record<string, { title: string; description: string }> = {
  "/projects": {
    title: "Projects",
    description: "Your workspace projects will appear here.",
  },
  "/deployments": {
    title: "Deployments",
    description: "Your deployment history will appear here.",
  },
  "/activity": {
    title: "Activity",
    description: "Recent workspace activity will appear here.",
  },
  "/settings": {
    title: "Settings",
    description: "Manage your workspace preferences here.",
  },
};

const WorkspacePage = () => {
  const { pathname } = useLocation();
  const page = pageDetails[pathname] ?? {
    title: "Workspace",
    description: "Your workspace content will appear here.",
  };

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h1 className="font-heading text-3xl font-bold tracking-normal">
        {page.title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-(--dashboard-muted)">
        {page.description}
      </p>
    </section>
  );
};

export default WorkspacePage;
