import type { FC, ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthShellProps {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

/** Public header + a centered card. Shared by login, register, forgot, reset and verify. */
export const AuthShell: FC<AuthShellProps> = ({ title, description, children, footer }) => (
  <>
    <SiteHeader />
    <main id="main" className="grid flex-1 place-items-center px-4 py-10 md:py-16">
      <div className="w-full max-w-[440px] rounded-lg border border-hairline bg-canvas p-6 sm:p-8">
        <h1 className="text-display-md">{title}</h1>
        {description ? <p className="mt-2 text-muted-foreground">{description}</p> : null}
        <div className="mt-6">{children}</div>
        {footer ? <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p> : null}
      </div>
    </main>
  </>
);

/** Suspense fallback for auth pages that read the query string. */
export const AuthShellSkeleton: FC = () => (
  <>
    <SiteHeader />
    <main className="grid flex-1 place-items-center px-4 py-10 md:py-16">
      <div className="w-full max-w-[440px] rounded-lg border border-hairline p-6 sm:p-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-3 h-4 w-64" />
        <div className="mt-8 flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </main>
  </>
);
