import type { ProjectImage } from "@/features/images/interfaces/images.interfaces";

export const ProjectStatuses = {
  DRAFT: "DRAFT",
  FETCHING: "FETCHING",
  READY: "READY",
  QUEUED: "QUEUED",
  CREATING: "CREATING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;
export type ProjectStatus = (typeof ProjectStatuses)[keyof typeof ProjectStatuses];

export const RenderSteps = {
  QUEUED: "QUEUED",
  PREPARING: "PREPARING",
  GENERATING: "GENERATING",
  ASSEMBLING: "ASSEMBLING",
  UPLOADING: "UPLOADING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  BLOCKED_NO_CREDITS: "BLOCKED_NO_CREDITS",
} as const;
export type RenderStep = (typeof RenderSteps)[keyof typeof RenderSteps];

export const SourceTypes = {
  WEBSITE: "website",
  AIRBNB: "airbnb",
  UPLOAD: "upload",
} as const;
export type SourceType = (typeof SourceTypes)[keyof typeof SourceTypes];

export const FailureCodes = {
  SCRAPE_EMPTY: "scrape_empty",
  SCRAPE_FAILED: "scrape_failed",
  PROVIDER_TIMEOUT: "provider_timeout",
  TOO_FEW_CLIPS: "too_few_clips",
  FFMPEG_ERROR: "ffmpeg_error",
  BLOCKED_NO_CREDITS: "blocked_no_credits",
} as const;

/** Statuses during which the API changes the project without user action (drives polling). */
export const InProgressStatuses: ReadonlyArray<ProjectStatus> = [
  ProjectStatuses.FETCHING,
  ProjectStatuses.QUEUED,
  ProjectStatuses.CREATING,
];

/** Statuses where the user still edits photos and details. */
export const EditableStatuses: ReadonlyArray<ProjectStatus> = [ProjectStatuses.DRAFT, ProjectStatuses.READY];

export interface Project {
  id: string;
  source_type: SourceType;
  source_url: string | null;
  status: ProjectStatus;
  render_step: RenderStep | null;
  partial: boolean;
  failure_reason: string | null;
  failure_code: string | null;
  title: string;
  subtitle: string | null;
  location_line: string | null;
  closing_line: string | null;
  music_enabled: boolean;
  soundtrack_id: string;
  rights_attested: boolean;
  watermark_consent: boolean;
  submitted_at: string | null;
  completed_at: string | null;
  duration_seconds: number | null;
  clips_total: number;
  clips_done: number;
  poster_url: string | null;
  image_count: number;
  estimated_duration_seconds: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface ProjectListItem extends Omit<Project, "images"> {
  preview_thumb_urls?: string[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ProjectsQuery {
  page?: number;
  limit?: number;
  status?: ProjectStatus;
}

export interface CreateProjectDto {
  source_type: SourceType;
  source_url?: string;
}

export interface UpdateProjectDto {
  title?: string;
  subtitle?: string | null;
  location_line?: string | null;
  closing_line?: string | null;
  music_enabled?: boolean;
  soundtrack_id?: string;
}

export interface Soundtrack {
  id: string;
  name: string;
  description: string;
}

export interface SubmitProjectDto {
  rights_attested?: boolean;
}

export interface PlayUrlResponse {
  url: string;
  expires_in: number;
}
