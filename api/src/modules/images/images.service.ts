import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomUUID } from 'crypto';
import { ZipArchive } from 'archiver';
import sharp = require('sharp');
import {
  type Image,
  type Project,
  ProjectStatus,
  RoomType,
  WatermarkStatus,
} from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { Limits } from '@/core/queues/queues.constants';
import { QueuesService } from '@/core/queues/queues.service';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { SystemFlagsService } from '@/modules/system-flags/system-flags.service';
import { CreditTiersService } from '@/modules/credits/services/credit-tiers.service';
import { ProjectsService } from '@/modules/projects/projects.service';
import { MediaUrlsService } from '@/modules/projects/services/media-urls.service';
import { ProjectSerializer } from '@/modules/projects/services/project-serializer.service';
import type {
  ProjectImageJson,
  SignedDownloadResponse,
} from '@/modules/projects/interfaces/project.interface';
import { getLimits } from '@/modules/projects/utils/limits.utils';
import { slugify } from '@/modules/projects/utils/source-url.utils';
import { ConfirmImagesDto, OrderImagesDto } from './dto/image-ids.dto';
import { UploadUrlsDto } from './dto/upload-urls.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { RemoveWatermarkDto } from './dto/remove-watermark.dto';
import type { DownloadUrlQueryType } from './dto/download-url-query.schema';
import type {
  ConfirmResultJson,
  RejectedImageJson,
  UploadUrlJson,
} from './interfaces/image.interface';
import {
  detectImageType,
  EXTENSION_BY_TYPE,
  mapWithConcurrency,
} from './utils/image-validation.utils';

const READY = { removed: false, ready: true } as const;
const PENDING_UPLOAD_TTL_MS = 60 * 60 * 1000;
const CONFIRM_CONCURRENCY = 3;

type ImageWithProject = Image & { project: Project };

interface ConfirmedImage {
  id: string;
  width: number;
  height: number;
  bytes: number;
  content_hash: string;
  gcs_thumb_path: string;
}

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly projects: ProjectsService,
    private readonly serializer: ProjectSerializer,
    private readonly media: MediaUrlsService,
    private readonly gcs: GcsObjectsService,
    private readonly queues: QueuesService,
    private readonly flags: SystemFlagsService,
    private readonly tiers: CreditTiersService,
  ) {}

  // -------------------------------------------------------------- upload urls

  async createUploadUrls(
    userId: string,
    projectId: string,
    dto: UploadUrlsDto,
  ): Promise<{ uploads: UploadUrlJson[] }> {
    const project = await this.projects.findOwnedOrThrow(userId, projectId);
    this.assertEditable(project);
    this.media.requireConfigured();

    const { maxImages } = await this.tiers.imageLimits();

    await this.discardStalePendingUploads(project);

    // Only confirmed photos count: abandoned pending slots from failed attempts must not block a retry.
    // The cap is enforced again in `confirm`.
    const existing = await this.prisma.image.count({
      where: { project_id: project.id, ...READY },
    });
    if (existing + dto.files.length > maxImages) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.TOO_MANY_IMAGES,
        `A video can use at most ${maxImages} photos.`,
      );
    }

    const planned = dto.files.map((file) => {
      const imageId = randomUUID();
      const ext = EXTENSION_BY_TYPE[file.content_type];
      return {
        imageId,
        contentType: file.content_type,
        path: StoragePaths.imageOriginal(userId, project.id, imageId, ext),
      };
    });

    // Sign first so nothing is written when storage is unavailable.
    const uploads: UploadUrlJson[] = await Promise.all(
      planned.map(async (p) => ({
        image_id: p.imageId,
        upload_url: await this.media.upload(p.path, p.contentType),
        content_type: p.contentType,
        expires_in: this.media.expiresIn,
      })),
    );

    await this.prisma.image.createMany({
      data: planned.map((p) => ({
        id: p.imageId,
        project_id: project.id,
        position: 0,
        gcs_original_path: p.path,
        ready: false,
      })),
    });

    return { uploads };
  }

  private async discardStalePendingUploads(project: Project) {
    const stale = await this.prisma.image.findMany({
      where: {
        project_id: project.id,
        ready: false,
        created_at: { lt: new Date(Date.now() - PENDING_UPLOAD_TTL_MS) },
      },
      select: { id: true, gcs_original_path: true },
    });
    if (stale.length === 0) return;

    await this.prisma.image.deleteMany({ where: { id: { in: stale.map((i) => i.id) } } });
    if (this.media.isConfigured()) {
      await Promise.all(
        stale.map((i) =>
          i.gcs_original_path ? this.gcs.deleteObject(i.gcs_original_path).catch(() => undefined) : undefined,
        ),
      );
    }
  }

  // ------------------------------------------------------------------ confirm

  async confirm(userId: string, projectId: string, dto: ConfirmImagesDto): Promise<ConfirmResultJson> {
    const project = await this.projects.findOwnedOrThrow(userId, projectId);
    this.assertEditable(project);
    this.media.requireConfigured();

    const rows = await this.prisma.image.findMany({
      where: { project_id: project.id, id: { in: dto.image_ids }, removed: false },
    });
    const byId = new Map(rows.map((r) => [r.id, r]));

    const rejected: RejectedImageJson[] = [];
    const toProcess: Image[] = [];
    const alreadyReady: string[] = [];

    for (const id of dto.image_ids) {
      const row = byId.get(id);
      if (!row) {
        rejected.push({ image_id: id, code: ErrorCodes.NOT_FOUND, message: 'Image not found.' });
      } else if (row.ready) {
        alreadyReady.push(id);
      } else {
        toProcess.push(row);
      }
    }

    const { maxImages } = await this.tiers.imageLimits();
    const readyCount = await this.prisma.image.count({ where: { project_id: project.id, ...READY } });
    const capacity = Math.max(0, maxImages - readyCount);
    for (const image of toProcess.splice(capacity)) {
      await this.discardUpload(image);
      rejected.push({
        image_id: image.id,
        code: ErrorCodes.TOO_MANY_IMAGES,
        message: `A video can use at most ${maxImages} photos.`,
      });
    }

    const outcomes = await mapWithConcurrency(toProcess, CONFIRM_CONCURRENCY, (image) =>
      this.verifyUpload(userId, project.id, image),
    );

    const confirmed: ConfirmedImage[] = [];
    for (const outcome of outcomes) {
      if ('rejected' in outcome) rejected.push(outcome.rejected);
      else confirmed.push(outcome);
    }

    if (confirmed.length > 0) {
      await this.prisma.$transaction(async (tx) => {
        const base = await tx.image.count({ where: { project_id: project.id, ...READY } });
        for (let i = 0; i < confirmed.length; i++) {
          const c = confirmed[i];
          await tx.image.update({
            where: { id: c.id },
            data: {
              ready: true,
              position: base + i + 1,
              width: c.width,
              height: c.height,
              bytes: c.bytes,
              content_hash: c.content_hash,
              gcs_thumb_path: c.gcs_thumb_path,
            },
          });
        }

        // DRAFT (or an unsubmitted failed import) becomes READY once there is a photo.
        if (project.status === ProjectStatus.DRAFT || project.status === ProjectStatus.FAILED) {
          await tx.project.updateMany({
            where: { id: project.id, submitted_at: null, status: project.status },
            data: {
              status: ProjectStatus.READY,
              failure_reason: null,
              failure_code: null,
              scrape_error: null,
            },
          });
        }
      });
    }

    const wanted = new Set([...alreadyReady, ...confirmed.map((c) => c.id)]);
    const all = await this.prisma.image.findMany({
      where: { project_id: project.id, ...READY },
      orderBy: { position: 'asc' },
    });
    const images = await this.serializer.toImages(
      project,
      all,
    );

    return { images: images.filter((i) => wanted.has(i.id)), rejected };
  }

  /** Verifies one uploaded object; rejected uploads are removed from storage and the database. */
  private async verifyUpload(
    userId: string,
    projectId: string,
    image: Image,
  ): Promise<ConfirmedImage | { rejected: RejectedImageJson }> {
    const reject = async (code: string, message: string) => {
      await this.discardUpload(image);
      return { rejected: { image_id: image.id, code, message } };
    };

    const path = image.gcs_original_path;
    if (!path) return reject('upload_missing', 'The file was not uploaded.');

    try {
      const head = await this.gcs.head(path);
      if (!head) return reject('upload_missing', 'The file was not uploaded.');
      if (head.size > Limits.MAX_UPLOAD_BYTES) return reject('file_too_large', 'The file is larger than 20 MB.');

      const magic = await this.gcs.readHead(path, 16);
      if (!detectImageType(magic)) {
        return reject('invalid_image', 'Only JPG, PNG and WebP images are accepted.');
      }

      const buffer = await this.gcs.downloadToBuffer(path);
      if (buffer.length > Limits.MAX_UPLOAD_BYTES) {
        return reject('file_too_large', 'The file is larger than 20 MB.');
      }

      let metadata: sharp.Metadata;
      try {
        metadata = await sharp(buffer).metadata();
      } catch {
        return reject('invalid_image', 'This image could not be read.');
      }

      const rotated = (metadata.orientation ?? 1) >= 5;
      const width = (rotated ? metadata.height : metadata.width) ?? 0;
      const height = (rotated ? metadata.width : metadata.height) ?? 0;
      if (!width || !height) return reject('invalid_image', 'This image could not be read.');

      // Small photos are accepted; they surface as `low_resolution` in the project payload instead of being rejected.
      if (Math.min(width, height) < Limits.MIN_SIDE_REJECT) {
        this.logger.warn(`Accepting low-resolution upload ${image.id} (${width}x${height})`);
      }

      const thumb = await sharp(buffer)
        .rotate()
        .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
      const thumbPath = StoragePaths.imageThumb(userId, projectId, image.id);
      await this.gcs.uploadBuffer(thumbPath, thumb, 'image/jpeg');

      return {
        id: image.id,
        width,
        height,
        bytes: buffer.length,
        content_hash: createHash('sha256').update(buffer).digest('hex'),
        gcs_thumb_path: thumbPath,
      };
    } catch (error) {
      this.logger.error(`Failed to verify upload ${image.id}: ${(error as Error).message}`);
      return { rejected: { image_id: image.id, code: 'verification_failed', message: 'This file could not be verified. Please upload it again.' } };
    }
  }

  private async discardUpload(image: Image) {
    try {
      if (image.gcs_original_path) await this.gcs.deleteObject(image.gcs_original_path);
    } catch {
      // best effort
    }
    await this.prisma.image.delete({ where: { id: image.id } }).catch(() => undefined);
  }

  // -------------------------------------------------------------------- order

  async reorder(userId: string, projectId: string, dto: OrderImagesDto): Promise<void> {
    const project = await this.projects.findOwnedOrThrow(userId, projectId);
    this.projects.assertUnlocked(project);

    const current = await this.prisma.image.findMany({
      where: { project_id: project.id, ...READY },
      select: { id: true },
    });
    const currentIds = new Set(current.map((i) => i.id));
    const requested = new Set(dto.image_ids);

    if (
      requested.size !== dto.image_ids.length ||
      requested.size !== currentIds.size ||
      dto.image_ids.some((id) => !currentIds.has(id))
    ) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.INVALID_IMAGE_ORDER,
        'The list must contain every photo of the project exactly once.',
      );
    }

    await this.prisma.$transaction(
      dto.image_ids.map((id, index) =>
        this.prisma.image.update({ where: { id }, data: { position: index + 1 } }),
      ),
    );
  }

  // ------------------------------------------------------------ patch / delete

  async update(userId: string, imageId: string, dto: UpdateImageDto): Promise<ProjectImageJson> {
    const image = await this.findOwnedImage(userId, imageId);
    this.projects.assertUnlocked(image.project);

    if (dto.use_processed === true && !image.gcs_processed_path) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.NO_PROCESSED_VERSION,
        'This photo has no watermark-free version yet.',
      );
    }

    const updated = await this.prisma.image.update({
      where: { id: image.id },
      data: {
        ...(dto.room_type !== undefined && dto.room_type !== null ? { room_type: dto.room_type } : {}),
        ...(dto.use_processed !== undefined && dto.use_processed !== null
          ? { use_processed: dto.use_processed }
          : {}),
      },
    });

    return this.serializeOne(image.project, updated);
  }

  async remove(userId: string, imageId: string): Promise<void> {
    const image = await this.findOwnedImage(userId, imageId);
    this.projects.assertUnlocked(image.project);

    await this.prisma.$transaction(async (tx) => {
      await tx.image.update({ where: { id: image.id }, data: { removed: true, position: 0 } });

      const remaining = await tx.image.findMany({
        where: { project_id: image.project_id, ...READY },
        orderBy: { position: 'asc' },
        select: { id: true, position: true },
      });
      for (let i = 0; i < remaining.length; i++) {
        if (remaining[i].position !== i + 1) {
          await tx.image.update({ where: { id: remaining[i].id }, data: { position: i + 1 } });
        }
      }

      if (remaining.length === 0 && image.project.status === ProjectStatus.READY) {
        await tx.project.update({ where: { id: image.project_id }, data: { status: ProjectStatus.DRAFT } });
      }
    });
  }

  // ---------------------------------------------------------- remove watermark

  async removeWatermark(
    userId: string,
    imageId: string,
    dto: RemoveWatermarkDto,
    ip: string | null,
  ): Promise<ProjectImageJson> {
    const image = await this.findOwnedImage(userId, imageId);
    const project = image.project;
    this.projects.assertUnlocked(project);

    const { wmMaxAttempts } = getLimits();

    const flags = await this.flags.get();
    if (!flags.dewatermark_enabled) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.DEWATERMARK_DISABLED,
        'Watermark removal is temporarily unavailable. You can continue without it.',
      );
    }
    if (!this.config.get<string>('DEWATERMARK_API_KEY')) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.DEWATERMARK_UNAVAILABLE,
        'Watermark removal is not available. You can continue without it.',
      );
    }

    if (image.wm_status === WatermarkStatus.processing) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.ALREADY_PROCESSING,
        'Watermark removal is already running for this photo.',
      );
    }
    if (image.wm_attempts >= wmMaxAttempts) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.ATTEMPTS_EXHAUSTED,
        'You have used all watermark removal attempts for this photo.',
      );
    }

    // Claim the attempt atomically (guards against double clicks).
    const attempt = await this.prisma.$transaction(async (tx) => {
      const claimed = await tx.image.updateMany({
        where: {
          id: image.id,
          wm_status: { not: WatermarkStatus.processing },
          wm_attempts: { lt: wmMaxAttempts },
        },
        data: { wm_status: WatermarkStatus.processing, wm_attempts: { increment: 1 } },
      });
      if (claimed.count === 0) return null;

      const fresh = await tx.image.findUniqueOrThrow({
        where: { id: image.id },
        select: { wm_attempts: true },
      });
      return fresh.wm_attempts;
    });

    if (attempt === null) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.ALREADY_PROCESSING,
        'Watermark removal is already running for this photo.',
      );
    }

    try {
      await this.queues.enqueueDewatermark(image.id, project.id, attempt);
    } catch (error) {
      await this.prisma.image
        .update({
          where: { id: image.id },
          data: { wm_status: image.wm_status, wm_attempts: { decrement: 1 } },
        })
        .catch(() => undefined);
      throw error;
    }

    const updated = await this.prisma.image.findUniqueOrThrow({ where: { id: image.id } });
    return this.serializeOne(project, updated);
  }

  // ----------------------------------------------------------- download urls

  async getDownloadUrl(
    userId: string,
    imageId: string,
    query: DownloadUrlQueryType,
  ): Promise<SignedDownloadResponse> {
    const image = await this.findOwnedImage(userId, imageId);
    const path = query.version === 'processed' ? image.gcs_processed_path : image.gcs_original_path;

    if (!path) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.NO_PROCESSED_VERSION,
        'This photo has no watermark-free version.',
      );
    }

    const ext = path.split('.').pop() ?? 'jpg';
    const filename = `${slugify(image.project.title, 'reelty')}-${String(image.position).padStart(2, '0')}-${query.version}.${ext}`;
    const url = await this.media.requireRead(path, { downloadFilename: filename });
    return { url, expires_in: this.media.expiresIn, filename };
  }

  // --------------------------------------------------------------------- zip

  /**
   * Builds a store-level ZIP of the photos used, in video order. Entries are appended lazily
   * and streamed straight from storage. The caller pipes `archive` into the response.
   */
  async createZip(userId: string, projectId: string): Promise<{ archive: ZipArchive; filename: string }> {
    const project = await this.projects.findOwnedOrThrow(userId, projectId);
    this.media.requireConfigured();

    const images = await this.prisma.image.findMany({
      where: { project_id: project.id, ...READY },
      orderBy: { position: 'asc' },
    });
    const used = images.filter((i) => !project.skipped_image_ids.includes(i.id) && i.gcs_original_path);

    if (used.length === 0) {
      throw new ApiException(HttpStatus.CONFLICT, ErrorCodes.NO_IMAGES, 'There are no photos to download.');
    }

    const archive = new ZipArchive({ store: true });

    for (const image of used) {
      const nn = String(image.position).padStart(2, '0');
      const originalPath = image.gcs_original_path as string;
      const originalExt = originalPath.split('.').pop() ?? 'jpg';

      if (image.gcs_processed_path) {
        this.append(archive, originalPath, `${nn}-original.${originalExt}`);
        this.append(archive, image.gcs_processed_path, `${nn}-processed.jpg`);
      } else {
        const room =
          image.room_type === RoomType.AUTO ? 'photo' : image.room_type.toLowerCase().replace(/_/g, '-');
        this.append(archive, originalPath, `${nn}-${room}.${originalExt}`);
      }
    }

    void archive.finalize().catch((error: Error) => {
      this.logger.error(`ZIP finalize failed: ${error.message}`);
    });

    return { archive, filename: `${slugify(project.title, 'reelty-photos')}-photos.zip` };
  }

  private append(archive: ZipArchive, path: string, name: string) {
    const source = this.gcs.createReadStream(path);
    source.on('error', (error: Error) => {
      this.logger.error(`ZIP source failed: ${error.message}`);
      archive.abort();
    });
    archive.append(source, { name, store: true });
  }

  // ----------------------------------------------------------------- helpers

  private assertEditable(project: Project) {
    this.projects.assertUnlocked(project);
    if (project.status === ProjectStatus.FETCHING) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.INVALID_STATUS,
        'Photos are still being fetched from the link. Please wait until it finishes.',
      );
    }
  }

  private async findOwnedImage(userId: string, imageId: string): Promise<ImageWithProject> {
    const image = await this.prisma.image.findFirst({
      where: {
        id: imageId,
        ...READY,
        project: { user_id: userId, deleted_at: null },
      },
      include: { project: true },
    });
    if (!image) {
      throw new ApiException(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Not found');
    }
    return image;
  }

  private async serializeOne(project: Project, image: Image): Promise<ProjectImageJson> {
    const siblings = await this.prisma.image.findMany({
      where: { project_id: project.id, ...READY },
      select: { content_hash: true },
    });
    return this.serializer.toImage(project, image, this.serializer.hashCounts(siblings));
  }
}
