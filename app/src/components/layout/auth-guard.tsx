"use client";

import { useEffect, type FC, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/components/layout/app-shell";
import { BrandLogo } from "@/components/layout/brand-logo";
import { ApiError, setUnauthorizedHandler } from "@/config/api/axios";
import { useMe } from "@/features/auth/hooks/use-auth";
import { Routes } from "@/routes/routes";

const currentPath = () => `${window.location.pathname}${window.location.search}`;

/** Full-page skeleton shaped like the authenticated shell, shown while the session is checked. */
const ShellSkeleton: FC = () => (
  <>
    <div className="h-16 border-b border-hairline-soft">
      <div className="page-container flex h-16 items-center justify-between">
        <BrandLogo />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
    <div className="page-container flex flex-col gap-6 py-12">
      <Skeleton className="h-10 w-64" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[4/3] w-full rounded-lg" />
        ))}
      </div>
    </div>
  </>
);

/**
 * Guards /new, /videos and /projects/**. The axios layer already tried one refresh on 401;
 * a final 401 sends the user to /login?next=... and a mid-session expiry adds expired=1.
 */
export const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me, error, isPending, refetch, isFetching } = useMe();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      const next = currentPath();
      queryClient.clear();
      router.replace(Routes.loginWithNext(next, true));
    });
    return () => setUnauthorizedHandler(null);
  }, [queryClient, router]);

  const unauthorized = error instanceof ApiError && error.status === 401;

  useEffect(() => {
    if (unauthorized) router.replace(Routes.loginWithNext(currentPath()));
  }, [unauthorized, router]);

  if (me) return <AppShell me={me}>{children}</AppShell>;

  if (isPending || unauthorized) return <ShellSkeleton />;

  return (
    <main id="main" className="page-container flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-display-sm">We could not load your account</h1>
      <p className="max-w-md text-muted-foreground">
        {error instanceof ApiError ? error.message : "Something went wrong."} Check your connection and try again.
      </p>
      <Button onClick={() => refetch()} disabled={isFetching}>
        Try again
      </Button>
    </main>
  );
};
