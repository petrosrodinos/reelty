"use client";

import type { FC } from "react";
import Link from "next/link";
import { ImageOffIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatePanel } from "@/components/ui/state-panel";
import { ProjectSourceTypeFormOptions } from "@/config/constants/dropdowns/projects/project-source-type-form.options";
import { NewProjectTabs } from "@/config/constants/dropdowns/projects/new-project-tab-form.options";
import { getFailureDescription } from "@/config/constants/dropdowns/projects/failure-code-description.options";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { Routes } from "@/routes/routes";

/** Dark progress card while the scrape worker reads the listing (FR-INTAKE-5). Polling lives in useProject. */
export const FetchingView: FC<{ project: Project }> = ({ project }) => (
  <div className="page-container max-w-3xl py-10 md:py-14">
    <p className="text-eyebrow text-muted-foreground">
      <Link href={Routes.videos} className="hover:text-ink">
        My Videos
      </Link>{" "}
      / {getDropdownOptionLabel(ProjectSourceTypeFormOptions, project.source_type)}
    </p>
    <h1 className="text-display-lg mt-2">Fetching your photos</h1>
    <div className="dark mt-8 rounded-lg bg-surface-dark p-6 text-on-dark sm:p-8" role="status" aria-live="polite">
      <p className="text-eyebrow text-on-dark-soft">Fetching photos</p>
      <p className="mt-2 font-display text-3xl font-medium tracking-tight">Reading your listing…</p>
      {project.source_url ? <p className="mt-3 break-all font-mono text-[0.8125rem] text-on-dark-soft">{project.source_url}</p> : null}
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-surface-dark-elevated" aria-hidden="true">
        <div className="h-full w-1/3 animate-[fetching_1.6s_ease-in-out_infinite] rounded-full bg-brand" />
      </div>
      <p className="mt-5 text-sm text-on-dark-soft">
        We find the gallery photos, skip logos and icons, and copy them to private storage. This usually takes a minute or two. You will land in the
        image manager automatically, or you can leave and come back from My Videos.
      </p>
    </div>
    <div className="mt-6">
      <Button variant="outline" render={<Link href={Routes.videos} />} nativeButton={false}>
        Back to My Videos
      </Button>
    </div>
  </div>
);

/** Scrape finished with nothing usable: explain and offer the Upload fallback (FR-INTAKE-7). */
export const ScrapeFailedView: FC<{ project: Project }> = ({ project }) => (
  <div className="page-container py-12 md:py-20">
    <StatePanel
      icon={<ImageOffIcon className="size-6" aria-hidden="true" />}
      title="We could not get photos from that link"
      description={getFailureDescription(project.failure_reason, project.failure_code)}
    >
      <Button size="lg" render={<Link href={Routes.newWithTab(NewProjectTabs.UPLOAD)} />} nativeButton={false}>
        <UploadIcon /> Switch to Upload
      </Button>
      <Button size="lg" variant="outline" render={<Link href={Routes.new} />} nativeButton={false}>
        Try another link
      </Button>
    </StatePanel>
  </div>
);
