"use client";

import type { FC } from "react";
import Link from "next/link";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import { Spinner } from "@/components/ui/spinner";
import { getFailureDescription } from "@/config/constants/dropdowns/projects/failure-code-description.options";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/routes/routes";

interface FailedCardProps {
  project: Project;
  isRetrying: boolean;
  onRetry: () => void;
  onDelete: () => void;
}

export const FailedCard: FC<FailedCardProps> = ({ project, isRetrying, onRetry, onDelete }) => (
  <section className="rounded-lg border border-hairline bg-canvas p-5 sm:p-8" aria-labelledby="failed-heading">
    <ProjectStatusBadge status={project.status} />
    <h2 id="failed-heading" className="text-display-sm mt-4">
      We couldn&apos;t finish this video
    </h2>
    <p className="mt-2 max-w-xl text-muted-foreground">{getFailureDescription(project.failure_reason, project.failure_code)}</p>
    <div className="mt-6 flex flex-wrap gap-3">
      <Button size="lg" onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? <Spinner /> : <RefreshCwIcon />}
        Retry
      </Button>
      <Button size="lg" variant="outline" render={<Link href={Routes.videos} />} nativeButton={false}>
        Back to My Videos
      </Button>
      <Button size="lg" variant="ghost" onClick={onDelete}>
        Delete project
      </Button>
    </div>
  </section>
);
