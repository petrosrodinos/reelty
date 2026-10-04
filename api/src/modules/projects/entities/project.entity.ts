import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus, RenderStep, RoomType, SourceType } from 'generated/prisma';

export class ProjectImageEntity {
  @ApiProperty() id: string;
  @ApiProperty({ description: '1-based, dense' }) position: number;
  @ApiProperty({ nullable: true, type: Number }) width: number | null;
  @ApiProperty({ nullable: true, type: Number }) height: number | null;
  @ApiProperty({ nullable: true, type: Number }) bytes: number | null;
  @ApiProperty({ enum: RoomType }) room_type: string;
  @ApiProperty() use_processed: boolean;
  @ApiProperty({ enum: ['none', 'processing', 'done', 'failed'] }) wm_status: string;
  @ApiProperty() wm_attempts: number;
  @ApiProperty() wm_max_attempts: number;
  @ApiProperty() has_processed: boolean;
  @ApiProperty() is_duplicate: boolean;
  @ApiProperty() low_resolution: boolean;
  @ApiProperty({ enum: ['none', 'submitted', 'completed', 'failed'] }) clip_status: string;
  @ApiProperty() skipped: boolean;
  @ApiProperty({ nullable: true, type: String, description: 'Signed, 480 px' }) thumb_url: string | null;
  @ApiProperty({ nullable: true, type: String, description: 'Signed, inline' }) original_url: string | null;
  @ApiProperty({ nullable: true, type: String, description: 'Signed, inline' }) processed_url: string | null;
}

export class ProjectEntity {
  @ApiProperty() id: string;
  @ApiProperty({ enum: SourceType }) source_type: string;
  @ApiProperty({ nullable: true, type: String }) source_url: string | null;
  @ApiProperty({ enum: ProjectStatus }) status: string;
  @ApiProperty({ enum: RenderStep, nullable: true }) render_step: string | null;
  @ApiProperty() partial: boolean;
  @ApiProperty({ nullable: true, type: String }) failure_reason: string | null;
  @ApiProperty({ nullable: true, type: String }) failure_code: string | null;
  @ApiProperty() title: string;
  @ApiProperty({ nullable: true, type: String }) subtitle: string | null;
  @ApiProperty({ nullable: true, type: String }) location_line: string | null;
  @ApiProperty({ nullable: true, type: String }) closing_line: string | null;
  @ApiProperty() music_enabled: boolean;
  @ApiProperty() rights_attested: boolean;
  @ApiProperty() watermark_consent: boolean;
  @ApiProperty({ nullable: true, type: String }) submitted_at: string | null;
  @ApiProperty({ nullable: true, type: String }) completed_at: string | null;
  @ApiProperty({ nullable: true, type: Number }) duration_seconds: number | null;
  @ApiProperty() clips_total: number;
  @ApiProperty() clips_done: number;
  @ApiProperty({ nullable: true, type: String, description: 'Signed, when completed' }) poster_url: string | null;
  @ApiProperty() image_count: number;
  @ApiProperty() estimated_duration_seconds: number;
  @ApiProperty() created_at: string;
  @ApiProperty() updated_at: string;
  @ApiPropertyOptional({ type: [ProjectImageEntity], description: 'Only on GET /projects/:id' })
  images?: ProjectImageEntity[];
  @ApiPropertyOptional({ type: [String], description: 'Up to 4 signed thumbnails, list items only' })
  preview_thumb_urls?: string[];
}

export class PaginationEntity {
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() total_pages: number;
  @ApiProperty() has_next: boolean;
  @ApiProperty() has_prev: boolean;
}

export class ProjectListEntity {
  @ApiProperty({ type: [ProjectEntity] }) data: ProjectEntity[];
  @ApiProperty({ type: PaginationEntity }) pagination: PaginationEntity;
}

export class SignedUrlEntity {
  @ApiProperty({ description: 'V4 signed URL, valid 15 minutes. Never stored or logged.' }) url: string;
  @ApiProperty({ example: 900 }) expires_in: number;
}

export class SignedDownloadEntity extends SignedUrlEntity {
  @ApiProperty({ example: 'lovely-villa.mp4' }) filename: string;
}
