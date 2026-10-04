import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GcsConfig } from '@/integrations/storage/gcs/config/gcs.config';
import { GcsObjectsService, SignedReadOptions } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { Limits } from '@/core/queues/queues.constants';
import { ApiException } from '@/shared/errors/api-exception';
import { ErrorCodes } from '@/shared/config/error-codes';

/**
 * Null-safe facade over GcsObjectsService for signing. Signed URLs are generated per
 * request, never stored and never logged. When GCS is not configured every signer
 * returns null instead of crashing.
 */
@Injectable()
export class MediaUrlsService {
  private readonly logger = new Logger(MediaUrlsService.name);

  constructor(
    private readonly gcs: GcsObjectsService,
    private readonly gcsConfig: GcsConfig,
  ) {}

  get expiresIn(): number {
    return Limits.SIGNED_URL_TTL_SECONDS;
  }

  isConfigured(): boolean {
    return !!this.gcsConfig.getStorageClient();
  }

  requireConfigured(): void {
    if (!this.isConfigured()) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.STORAGE_UNAVAILABLE,
        'File storage is not available right now. Please try again later.',
      );
    }
  }

  /** Signed read URL, or null when there is no path / storage is not configured / signing failed. */
  async read(path: string | null | undefined, options: SignedReadOptions = {}): Promise<string | null> {
    if (!path || !this.isConfigured()) return null;
    try {
      return await this.gcs.getSignedReadUrl(path, {
        expiresSeconds: Limits.SIGNED_URL_TTL_SECONDS,
        ...options,
      });
    } catch (error) {
      this.logger.warn(`Could not sign a read URL: ${(error as Error).message}`);
      return null;
    }
  }

  async upload(path: string, contentType: string): Promise<string> {
    this.requireConfigured();
    try {
      return await this.gcs.getSignedUploadUrl(path, contentType, Limits.SIGNED_URL_TTL_SECONDS);
    } catch (error) {
      this.logger.error(`Could not sign an upload URL: ${(error as Error).message}`);
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.STORAGE_UNAVAILABLE,
        'File storage is not available right now. Please try again later.',
      );
    }
  }

  /** Same as read() but fails with 503 instead of returning null (explicit URL endpoints). */
  async requireRead(path: string, options: SignedReadOptions = {}): Promise<string> {
    this.requireConfigured();
    const url = await this.read(path, options);
    if (!url) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.STORAGE_UNAVAILABLE,
        'File storage is not available right now. Please try again later.',
      );
    }
    return url;
  }
}
