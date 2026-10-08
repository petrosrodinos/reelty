"use client";

import { useEffect, useRef, useState, type FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestionIcon, Trash2Icon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { StatePanel } from "@/components/ui/state-panel";
import { ApiError } from "@/config/api/axios";
import { useMe } from "@/features/auth/hooks/use-auth";
import { useDeleteProject, useProject, useSubmitProject } from "@/features/projects/hooks/use-projects";
import { EditableStatuses, ProjectStatuses } from "@/features/projects/interfaces/projects.interfaces";
import { useUsage } from "@/features/usage/hooks/use-usage";
import { Routes } from "@/routes/routes";
import { EditSkeleton } from "@/views/projects/edit/components/edit-skeleton";
import { FetchingView, ScrapeFailedView } from "@/views/projects/edit/components/fetching-view";
import { ImageManager } from "@/views/projects/edit/components/image-manager";
import { MobileCreateBar } from "@/views/projects/edit/components/mobile-create-bar";
import { SaveIndicator } from "@/views/projects/edit/components/save-indicator";
import { SummaryPanel } from "@/views/projects/edit/components/summary-panel";
import { VideoDetailsForm } from "@/views/projects/edit/components/video-details-form";
import { useVideoDetailsAutosave } from "@/views/projects/edit/hooks/use-video-details-autosave";
import { getCreateBlockers } from "@/views/projects/edit/utils/create-blockers";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import type { Me } from "@/features/auth/interfaces/auth.interfaces";

interface EditorProps {
  project: Project;
  me: Me;
  /** Called synchronously on submit success so the page does not redirect to the plain status URL first. */
  onCreated: () => void;
}

/** The image manager screen. Mounted only once the project is editable so form defaults come from real data. */
const Editor: FC<EditorProps> = ({ project, me, onCreated }) => {
  const router = useRouter();
  const { data: usage } = useUsage();
  const submit = useSubmitProject();
  const deleteProject = useDeleteProject();
  const { form, saveState, flush, retrySave } = useVideoDetailsAutosave(project);
  const [discarding, setDiscarding] = useState(false);

  const blockers = getCreateBlockers({ project, me, usage });

  const handleSubmit = async () => {
    if (blockers.length > 0 || submit.isPending) return;
    await flush();
    submit.mutate(
      { id: project.id, dto: {} },
      {
        onSuccess: () => {
          onCreated();
          router.push(Routes.projectCreated(project.id));
        },
      },
    );
  };

  return (
    <div className="page-container py-10 pb-32 md:py-12 md:pb-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow text-muted-foreground">
            <Link href={Routes.videos} className="hover:text-ink">
              My Videos
            </Link>{" "}
            / Edit
          </p>
          <h1 className="text-display-lg mt-2">Prepare your photos</h1>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator state={saveState} onRetry={retrySave} />
          <Button variant="ghost" onClick={() => setDiscarding(true)}>
            <Trash2Icon /> Discard
          </Button>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <ImageManager project={project} />
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24" aria-label="Video details and summary">
          <VideoDetailsForm project={project} form={form} />
          <SummaryPanel blockers={blockers} isSubmitting={submit.isPending} submitError={submit.error} onSubmit={handleSubmit} />
        </aside>
      </div>

      <MobileCreateBar blockers={blockers} isSubmitting={submit.isPending} onSubmit={handleSubmit} />

      <ConfirmationDialog
        isOpen={discarding}
        onClose={() => setDiscarding(false)}
        title="Discard this project?"
        description="This permanently removes the project and every photo from storage. This cannot be undone."
        confirmText="Discard project"
        variant="destructive"
        isLoading={deleteProject.isPending}
        onConfirm={() => deleteProject.mutate(project.id, { onSuccess: () => router.replace(Routes.videos) })}
      />
    </div>
  );
};

const EditProjectPage: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { data: project, error, isPending, refetch, isFetching } = useProject(id);
  const { data: me } = useMe();
  const createdRef = useRef(false);

  const isScrapeFailure =
    !!project &&
    !project.submitted_at &&
    project.source_type !== "upload" &&
    (project.status === ProjectStatuses.FAILED ||
      (project.status === ProjectStatuses.DRAFT && !!project.failure_code?.startsWith("scrape_")));
  const isEditable = !!project && EditableStatuses.includes(project.status);
  const isFetchingPhotos = project?.status === ProjectStatuses.FETCHING;
  const belongsOnDetail = !!project && !isEditable && !isFetchingPhotos && !isScrapeFailure;

  // Locked projects (queued, creating, completed, failed render) live on the status page.
  useEffect(() => {
    if (belongsOnDetail && !createdRef.current) router.replace(Routes.project(id));
  }, [belongsOnDetail, id, router]);

  if (error) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="page-container py-12 md:py-20">
        <StatePanel
          icon={notFound ? <FileQuestionIcon className="size-6" /> : <WifiOffIcon className="size-6" />}
          title={notFound ? "We could not find this project" : "We could not load this project"}
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

  if (isPending || !project || !me || belongsOnDetail) return <EditSkeleton />;
  if (isFetchingPhotos) return <FetchingView project={project} />;
  if (isScrapeFailure) return <ScrapeFailedView project={project} />;
  return <Editor key={project.id} project={project} me={me} onCreated={() => (createdRef.current = true)} />;
};

export default EditProjectPage;
