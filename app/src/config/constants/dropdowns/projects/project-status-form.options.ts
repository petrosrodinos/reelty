import { ProjectStatuses, type ProjectStatus } from "@/features/projects/interfaces/projects.interfaces";

/** Canonical status labels (spec section 2). Used by chips, cards and the filter. */
export const ProjectStatusFormOptions: { id: ProjectStatus; label: string }[] = [
  { id: ProjectStatuses.DRAFT, label: "Draft" },
  { id: ProjectStatuses.FETCHING, label: "Fetching photos" },
  { id: ProjectStatuses.READY, label: "Ready to edit" },
  { id: ProjectStatuses.QUEUED, label: "Queued" },
  { id: ProjectStatuses.CREATING, label: "Creating video" },
  { id: ProjectStatuses.COMPLETED, label: "Completed" },
  { id: ProjectStatuses.FAILED, label: "Failed" },
];
