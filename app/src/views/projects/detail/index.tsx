"use client";

import { useEffect, useState, type FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FileQuestionIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { StatePanel } from "@/components/ui/state-panel";
import { ApiError } from "@/config/api/axios";
import { ProjectSourceTypeFormOptions } from "@/config/constants/dropdowns/projects/project-source-type-form.options";
import { useDeleteProject, useProject, useRetryProject } from "@/features/projects/hooks/use-projects";
import { ProjectStatuses } from "@/features/projects/interfaces/projects.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { QueryParams, Routes } from "@/routes/routes";
import { BackgroundBanner, ProgressCard } from "@/views/projects/detail/components/progress-card";
import { CompletedView } from "@/views/projects/detail/components/completed-view";
import { CreatedDialog } from "@/views/projects/detail/components/created-dialog";
import { DetailSkeleton } from "@/views/projects/detail/components/detail-skeleton";
import { FailedCard } from "@/views/projects/detail/components/failed-card";

const ProjectDetailPage: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const justCreated = useSearchParams().get(QueryParams.created) === "1";
  const { data: project, error, isPending, refetch, isFetching } = useProject(id);
  const retry = useRetryProject();
  const deleteProject = useDeleteProject();
  const [deleting, setDeleting] = useState(false);

  // Drafts, fetching projects and scrape failures are edited, not viewed.
  const needsEditor =
    !!project &&
    (project.status === ProjectStatuses.DRAFT ||
      project.status === ProjectStatuses.READY ||
      project.status === ProjectStatuses.FETCHING ||
      (project.status === ProjectStatuses.FAILED && !project.submitted_at));

  useEffect(() => {
    if (needsEditor) router.replace(Routes.edit(id));
  }, [needsEditor, id, router]);

  if (error) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="page-container py-12 md:py-20">
        <StatePanel
          icon={notFound ? <FileQuestionIcon className="size-6" /> : <WifiOffIcon className="size-6" />}
          title={notFound ? "We could not find this video" : "We could not load this video"}
          description={notFound ? "It may have been deleted." : error.message}
        >
          {notFound ? null : (
            <Button onClick={() => refetch()} disabled={isFetching}>
              Try again
            </Button>
          )}
          <Button variant="outline" render={<Link href={Routes.videos} />} nativeButton={false}>
            Back to My Videos
          </Button>
        </StatePanel>
      </div>
    );
  }

  if (isPending || !project || needsEditor) return <DetailSkeleton />;

  const inProgress = project.status === ProjectStatuses.QUEUED || project.status === ProjectStatuses.CREATING;
  const subtitle = [project.subtitle, project.location_line].filter(Boolean).join(" · ");

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-eyebrow text-muted-foreground">
            <Link href={Routes.videos} className="hover:text-ink">
              My Videos
            </Link>{" "}
            / {getDropdownOptionLabel(ProjectSourceTypeFormOptions, project.source_type)}
          </p>
          <h1 className="text-display-lg mt-2 break-words">{project.title || "Untitled video"}</h1>
          {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
        </div>
        <Button variant="outline" render={<Link href={Routes.videos} />} nativeButton={false}>
          Back to My Videos
        </Button>
      </div>

      {inProgress ? (
        <div className="mb-6">
          <BackgroundBanner />
        </div>
      ) : null}

      {inProgress ? <ProgressCard project={project} /> : null}
      {project.status === ProjectStatuses.FAILED ? (
        <FailedCard project={project} isRetrying={retry.isPending} onRetry={() => retry.mutate(project.id)} onDelete={() => setDeleting(true)} />
      ) : null}
      {project.status === ProjectStatuses.COMPLETED ? <CompletedView project={project} onDelete={() => setDeleting(true)} /> : null}

      <CreatedDialog isOpen={justCreated && inProgress} onClose={() => router.replace(Routes.project(id))} />

      <ConfirmationDialog
        isOpen={deleting}
        onClose={() => setDeleting(false)}
        title="Delete this project?"
        description={`This permanently removes "${project.title || "Untitled video"}", its video, poster and every photo from storage. This cannot be undone.`}
        confirmText="Delete project"
        variant="destructive"
        isLoading={deleteProject.isPending}
        onConfirm={() =>
          deleteProject.mutate(project.id, {
            onSuccess: () => router.replace(Routes.videos),
            onError: () => setDeleting(false),
          })
        }
      />
    </div>
  );
};

export default ProjectDetailPage;
