import { ProjectStatusFormOptions } from "@/config/constants/dropdowns/projects/project-status-form.options";
import type { ProjectStatus } from "@/features/projects/interfaces/projects.interfaces";

export const ProjectStatusFilterOptions: { id: ProjectStatus | "all"; label: string }[] = [
  { id: "all", label: "All statuses" },
  ...ProjectStatusFormOptions,
];
