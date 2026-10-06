"use client";

import type { FC, ReactNode } from "react";
import Link from "next/link";
import { ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { useMe } from "@/features/auth/hooks/use-auth";
import { isAdminRole } from "@/features/auth/interfaces/auth.interfaces";
import { Routes } from "@/routes/routes";

/** Client-side gate for admin screens. The API enforces the role too; this only avoids showing a dead page. */
export const AdminGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: me, isPending } = useMe();

  if (isPending) {
    return (
      <div className="page-container flex flex-col gap-6 py-10 md:py-14">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!isAdminRole(me?.role)) {
    return (
      <div className="page-container py-16">
        <StatePanel
          icon={<ShieldAlertIcon className="size-6" />}
          title="Admins only"
          description="Your account does not have access to this page."
        >
          <Button render={<Link href={Routes.videos} />} nativeButton={false}>
            Back to my videos
          </Button>
        </StatePanel>
      </div>
    );
  }

  return <>{children}</>;
};
