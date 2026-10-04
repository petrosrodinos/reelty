import type { ProjectImageJson } from '@/modules/projects/interfaces/project.interface';

export interface UploadUrlJson {
  image_id: string;
  upload_url: string;
  content_type: string;
  expires_in: number;
}

export interface RejectedImageJson {
  image_id: string;
  code: string;
  message: string;
}

export interface ConfirmResultJson {
  images: ProjectImageJson[];
  rejected: RejectedImageJson[];
}
