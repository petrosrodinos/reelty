export const RoomTypes = {
  AUTO: "AUTO",
  EXTERIOR: "EXTERIOR",
  LIVING_ROOM: "LIVING_ROOM",
  KITCHEN: "KITCHEN",
  BEDROOM: "BEDROOM",
  BATHROOM: "BATHROOM",
  TERRACE_VIEW: "TERRACE_VIEW",
  OTHER: "OTHER",
} as const;
export type RoomType = (typeof RoomTypes)[keyof typeof RoomTypes];

export const WatermarkStatuses = {
  NONE: "none",
  PROCESSING: "processing",
  DONE: "done",
  FAILED: "failed",
} as const;
export type WatermarkStatus = (typeof WatermarkStatuses)[keyof typeof WatermarkStatuses];

export const ClipStatuses = {
  NONE: "none",
  SUBMITTED: "submitted",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;
export type ClipStatus = (typeof ClipStatuses)[keyof typeof ClipStatuses];

export const ImageDownloadVersions = {
  ORIGINAL: "original",
  PROCESSED: "processed",
} as const;
export type ImageDownloadVersion = (typeof ImageDownloadVersions)[keyof typeof ImageDownloadVersions];

export interface ProjectImage {
  id: string;
  position: number;
  width: number | null;
  height: number | null;
  bytes: number | null;
  room_type: RoomType;
  use_processed: boolean;
  wm_status: WatermarkStatus;
  wm_attempts: number;
  wm_max_attempts: number;
  has_processed: boolean;
  is_duplicate: boolean;
  low_resolution: boolean;
  clip_status: ClipStatus;
  skipped: boolean;
  thumb_url: string | null;
  original_url: string | null;
  processed_url: string | null;
}

export interface UpdateImageDto {
  room_type?: RoomType;
  use_processed?: boolean;
}

export interface RemoveWatermarkDto {
  accept_terms?: boolean;
}

export interface ReorderImagesDto {
  image_ids: string[];
}

export interface UploadFileDescriptor {
  filename: string;
  content_type: string;
  size: number;
}

export interface UploadUrlsDto {
  files: UploadFileDescriptor[];
}

export interface UploadUrlEntry {
  image_id: string;
  upload_url: string;
  content_type: string;
  expires_in: number;
}

export interface UploadUrlsResponse {
  uploads: UploadUrlEntry[];
}

export interface ConfirmImagesDto {
  image_ids: string[];
}

export interface RejectedImage {
  image_id: string;
  code: string;
  message: string;
}

export interface ConfirmImagesResponse {
  images: ProjectImage[];
  rejected: RejectedImage[];
}

export interface SignedDownload {
  url: string;
  expires_in: number;
  filename: string;
}

export const UploadItemStatuses = {
  QUEUED: "queued",
  UPLOADING: "uploading",
  CONFIRMING: "confirming",
  DONE: "done",
  REJECTED: "rejected",
  ERROR: "error",
} as const;
export type UploadItemStatus = (typeof UploadItemStatuses)[keyof typeof UploadItemStatuses];

export interface UploadItem {
  id: string;
  name: string;
  size: number;
  status: UploadItemStatus;
  /** 0 to 100 */
  progress: number;
  message?: string;
}

export interface UploadSummary {
  uploaded: number;
  rejected: number;
  failed: number;
  warnings: string[];
}
