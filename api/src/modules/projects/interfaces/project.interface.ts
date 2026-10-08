// JSON shapes from contract section 3 (snake_case, ISO dates).
export type ProjectStatusValue =
  | 'DRAFT'
  | 'FETCHING'
  | 'READY'
  | 'QUEUED'
  | 'CREATING'
  | 'COMPLETED'
  | 'FAILED';

export type RenderStepValue =
  | 'QUEUED'
  | 'PREPARING'
  | 'GENERATING'
  | 'ASSEMBLING'
  | 'UPLOADING'
  | 'COMPLETED'
  | 'FAILED'
  | 'BLOCKED_NO_CREDITS';

export interface ProjectImageJson {
  id: string;
  position: number;
  width: number | null;
  height: number | null;
  bytes: number | null;
  room_type: string;
  use_processed: boolean;
  wm_status: 'none' | 'processing' | 'done' | 'failed';
  wm_attempts: number;
  wm_max_attempts: number;
  has_processed: boolean;
  is_duplicate: boolean;
  low_resolution: boolean;
  clip_status: 'none' | 'submitted' | 'completed' | 'failed';
  skipped: boolean;
  thumb_url: string | null;
  original_url: string | null;
  processed_url: string | null;
}

export interface ProjectJson {
  id: string;
  source_type: 'website' | 'airbnb' | 'upload';
  source_url: string | null;
  status: ProjectStatusValue;
  render_step: RenderStepValue | null;
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
  images?: ProjectImageJson[];
  preview_thumb_urls?: string[];
}

export interface Paginated<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface SignedUrlResponse {
  url: string;
  expires_in: number;
}

export interface SignedDownloadResponse extends SignedUrlResponse {
  filename: string;
}
