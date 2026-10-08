import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Image, Project } from 'generated/prisma';
import { ProjectStatus } from 'generated/prisma';
import { Limits } from '@/core/queues/queues.constants';
import { MediaUrlsService } from './media-urls.service';
import type { ProjectImageJson, ProjectJson } from '../interfaces/project.interface';
import { estimateDurationSeconds, getLimits } from '../utils/limits.utils';

export interface ProjectSerializeContext {
  imageCount: number;
  watermarkConsent: boolean;
  /** Full image rows (detail view). */
  images?: Image[];
  /** Thumb paths for list previews. */
  previewThumbPaths?: string[];
}

/** Produces EXACTLY the JSON shapes of contract section 3. Signs URLs in parallel. */
@Injectable()
export class ProjectSerializer {
  private readonly wmMaxAttempts: number;

  constructor(
    private readonly media: MediaUrlsService,
    config: ConfigService,
  ) {
    this.wmMaxAttempts = getLimits().wmMaxAttempts;
  }

  /** Detail shape (images included when `ctx.images` is given). */
  async toProject(project: Project, ctx: ProjectSerializeContext): Promise<ProjectJson> {
    const [base, images] = await Promise.all([
      this.baseProject(project, ctx),
      ctx.images ? this.toImages(project, ctx.images) : Promise.resolve(undefined),
    ]);
    return images ? { ...base, images } : base;
  }

  /** List-item shape: no `images`, with `preview_thumb_urls` for non-completed projects. */
  async toListItem(project: Project, ctx: ProjectSerializeContext): Promise<ProjectJson> {
    const completed = project.status === ProjectStatus.COMPLETED;
    const [base, previews] = await Promise.all([
      this.baseProject(project, ctx),
      completed
        ? Promise.resolve<string[]>([])
        : Promise.all((ctx.previewThumbPaths ?? []).slice(0, 4).map((p) => this.media.read(p))).then(
            (urls) => urls.filter((u): u is string => !!u),
          ),
    ]);
    return { ...base, preview_thumb_urls: previews };
  }

  /** `siblings` must be all non-removed ready images of the project (duplicate detection). */
  async toImages(project: Project, images: Image[]): Promise<ProjectImageJson[]> {
    const hashCounts = this.hashCounts(images);
    return Promise.all(images.map((image) => this.toImage(project, image, hashCounts)));
  }

  async toImage(
    project: Pick<Project, 'skipped_image_ids'>,
    image: Image,
    hashCounts: Map<string, number>,
  ): Promise<ProjectImageJson> {
    const [thumbUrl, originalUrl, processedUrl] = await Promise.all([
      this.media.read(image.gcs_thumb_path),
      this.media.read(image.gcs_original_path),
      this.media.read(image.gcs_processed_path),
    ]);

    const longest = Math.max(image.width ?? 0, image.height ?? 0);

    return {
      id: image.id,
      position: image.position,
      width: image.width,
      height: image.height,
      bytes: image.bytes,
      room_type: image.room_type,
      use_processed: image.use_processed,
      wm_status: image.wm_status,
      wm_attempts: image.wm_attempts,
      wm_max_attempts: this.wmMaxAttempts,
      has_processed: !!image.gcs_processed_path,
      is_duplicate: !!image.content_hash && (hashCounts.get(image.content_hash) ?? 0) > 1,
      low_resolution: longest > 0 && longest < Limits.MIN_SIDE_WARN,
      clip_status: image.clip_status,
      skipped: project.skipped_image_ids.includes(image.id),
      thumb_url: thumbUrl,
      original_url: originalUrl,
      processed_url: processedUrl,
    };
  }

  hashCounts(images: Array<Pick<Image, 'content_hash'>>): Map<string, number> {
    const counts = new Map<string, number>();
    for (const image of images) {
      if (image.content_hash) {
        counts.set(image.content_hash, (counts.get(image.content_hash) ?? 0) + 1);
      }
    }
    return counts;
  }

  private async baseProject(project: Project, ctx: ProjectSerializeContext): Promise<ProjectJson> {
    const posterUrl =
      project.status === ProjectStatus.COMPLETED ? await this.media.read(project.poster_gcs_path) : null;

    return {
      id: project.id,
      source_type: project.source_type,
      source_url: project.source_url,
      status: project.status,
      render_step: project.render_step,
      partial: project.partial,
      failure_reason: project.failure_reason,
      failure_code: project.failure_code,
      title: project.title,
      subtitle: project.subtitle,
      location_line: project.location_line,
      closing_line: project.closing_line,
      music_enabled: project.music_enabled,
      soundtrack_id: project.soundtrack_id,
      rights_attested: project.rights_attested_at !== null,
      watermark_consent: ctx.watermarkConsent,
      submitted_at: project.submitted_at ? project.submitted_at.toISOString() : null,
      completed_at: project.completed_at ? project.completed_at.toISOString() : null,
      duration_seconds: project.duration_seconds,
      clips_total: project.clips_total,
      clips_done: project.clips_done,
      poster_url: posterUrl,
      image_count: ctx.imageCount,
      estimated_duration_seconds: estimateDurationSeconds(ctx.imageCount),
      created_at: project.created_at.toISOString(),
      updated_at: project.updated_at.toISOString(),
    };
  }
}
