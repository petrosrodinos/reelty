import type { FC } from "react"
import { cn } from "@/lib/utils"
import { ProjectStatusFormOptions } from "@/config/constants/dropdowns/projects/project-status-form.options"
import { RenderStepFormOptions } from "@/config/constants/dropdowns/projects/render-step-form.options"
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils"
import {
  ProjectStatuses,
  RenderSteps,
  type ProjectStatus,
  type RenderStep,
} from "@/features/projects/interfaces/projects.interfaces"

interface ProjectStatusBadgeProps {
  status: ProjectStatus
  renderStep?: RenderStep | null
  className?: string
}

// Dot colours only (visual styling); the text always comes from the dropdown option files.
const dotClass: Record<ProjectStatus, string> = {
  [ProjectStatuses.DRAFT]: "bg-muted-soft",
  [ProjectStatuses.READY]: "bg-muted-soft",
  [ProjectStatuses.FETCHING]: "bg-amber animate-pulse",
  [ProjectStatuses.QUEUED]: "bg-amber animate-pulse",
  [ProjectStatuses.CREATING]: "bg-amber animate-pulse",
  [ProjectStatuses.COMPLETED]: "bg-success",
  [ProjectStatuses.FAILED]: "bg-error",
}

export const ProjectStatusBadge: FC<ProjectStatusBadgeProps> = ({ status, renderStep, className }) => {
  const delayed = status === ProjectStatuses.CREATING && renderStep === RenderSteps.BLOCKED_NO_CREDITS
  const label = delayed
    ? getDropdownOptionLabel(RenderStepFormOptions, RenderSteps.BLOCKED_NO_CREDITS)
    : getDropdownOptionLabel(ProjectStatusFormOptions, status)
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-surface-card px-3 py-1 text-[0.8125rem] font-medium text-ink",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", delayed ? "bg-warning" : dotClass[status])} aria-hidden="true" />
      {label}
    </span>
  )
}
