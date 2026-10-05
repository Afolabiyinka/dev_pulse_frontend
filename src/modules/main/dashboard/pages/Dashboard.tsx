import { motion, type Variants } from "framer-motion";
import { Link } from "react-router";

import { ArrowRight, Folders, Workflow } from "lucide-react";

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

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const MotionLink = motion.create(Link);

const Dashboard = () => (
  <motion.section
    variants={container}
    initial="hidden"
    animate="show"
    className="mx-auto w-full max-w-5xl"
  >
    <motion.div variants={item} className="mb-9">
      <p className="mb-2 text-sm font-medium text-muted-foreground">
        Your workspace
      </p>
      <h1 className="font-heading text-3xl font-bold tracking-normal">
        A clear view of what you are building.
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Your projects and deployment activity will live here as you get set up.
      </p>
    </motion.div>

    <div className="grid gap-3 sm:grid-cols-2">
      {shortcuts.map(({ title, description, to, icon: Icon }) => (
        <MotionLink
          key={to}
          to={to}
          variants={item}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="group flex min-h-36 items-start justify-between rounded-xl border border-(--dashboard-border) p-5 outline-none transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div>
            <span className="mb-5 flex size-18 items-center justify-center rounded-3xl bg-muted">
              <Icon aria-hidden="true" size={40} className="stroke-[1px]" />
            </span>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mt-1  transition-transform group-hover:translate-x-1"
            size={17}
          />{" "}
        </MotionLink>
      ))}
    </div>
  </motion.section>
);

export default Dashboard;
