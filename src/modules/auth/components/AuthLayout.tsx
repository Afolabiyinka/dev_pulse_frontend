import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import LinkBrand from "@/components/custom/logo";

interface AuthLayoutProps {
  children: ReactNode;
  footer: ReactNode;
  description: string;
  title: string;
  eyebrow: string;
}

const AuthLayout = ({
  children,
  footer,
  description,
  title,
  eyebrow,
}: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[minmax(360px,0.9fr)_1.1fr]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-primary px-12 py-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:px-16">
        <LinkBrand />

        <div className="relative z-10 max-w-xl pb-10">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            <span className="h-px w-7 bg-primary-foreground/70" />A clearer way
            to build
          </p>
          <h2 className="max-w-lg font-heading text-5xl font-semibold leading-[1.08] tracking-normal xl:text-6xl">
            Make space for your next big thing.
          </h2>
          <div className="mt-12 flex items-center gap-3 text-sm text-primary-foreground/80">
            <div className="flex -space-x-2">
              {[
                "bg-primary-foreground/90",
                "bg-primary-foreground/70",
                "bg-primary-foreground/50",
                "bg-primary-foreground/30",
              ].map((color, index) => (
                <span
                  key={color}
                  aria-hidden="true"
                  className={`h-8 w-8 rounded-full border-2 border-primary ${color}`}
                  style={{ zIndex: 4 - index }}
                />
              ))}
            </div>
            <span>Good work starts with a good workspace.</span>
          </div>
        </div>

        <p className="relative z-10 text-xs text-primary-foreground/70">
          © 2026 Dockyard
        </p>
      </aside>

      <section className="flex min-h-screen flex-col px-5 py-7 sm:px-10 lg:px-12 xl:px-20">
        <div className="mb-12 lg:hidden">
          <LinkBrand />
        </div>

        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-8">
          <div className="mb-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {eyebrow}
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[440px] items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
          <span>© 2026 DevPulse</span>
          <a
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            href="mailto:support@dockyard.dev"
          >
            Help <ArrowUpRight aria-hidden="true" size={13} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
