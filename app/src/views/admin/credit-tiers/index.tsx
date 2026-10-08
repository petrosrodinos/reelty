"use client";

import type { FC } from "react";
import Link from "next/link";
import { WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { useCreditTiers } from "@/features/admin/hooks/use-admin";
import { Routes } from "@/routes/routes";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { TiersEditor } from "@/views/admin/credit-tiers/components/tiers-editor";

const AdminCreditTiersContent: FC = () => {
  const { data, isPending, error, refetch, isFetching } = useCreditTiers();

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Credit tiers</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          What a video costs in credits, by number of photos. The tiers also set how many photos a video can use:
          from the lowest tier&rsquo;s minimum to the highest tier&rsquo;s maximum, so add a tier to allow longer
          videos. Tiers must follow each other with no gaps or overlaps. The default tier prices one &ldquo;video&rdquo; on the buy-credits slider. Add-ons (watermark
          removal, link import), the signup grant and credits per euro are on the{" "}
          <Link href={Routes.adminConfig} className="underline underline-offset-4">
            Prices
          </Link>{" "}
          page.
        </p>
      </div>

      <AdminTabs />

      {isPending ? (
        <Skeleton className="h-72 w-full rounded-lg" />
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load the tiers" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : (
        <TiersEditor key={data.map((t) => `${t.id}:${t.updated_at}`).join("|")} tiers={data} />
      )}
    </div>
  );
};

const AdminCreditTiersPage: FC = () => (
  <AdminGuard>
    <AdminCreditTiersContent />
  </AdminGuard>
);

export default AdminCreditTiersPage;
