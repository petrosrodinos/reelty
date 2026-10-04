import { Injectable, Logger } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { GcsConfig } from '../config/gcs.config';

export interface ObjectHead {
  size: number;
  contentType?: string;
}

export interface SignedReadOptions {
  expiresSeconds?: number; // default 900 (15 min)
  /** Sets Content-Disposition: attachment; filename="..." */
  downloadFilename?: string;
  /** Overrides the response content type (e.g. video/mp4 for inline playback) */
  contentType?: string;
}

/**
 * Path-based object operations on the single private bucket (spec §7).
 * All paths are bucket-relative (see storage-paths.ts). Objects are never public.
 */
@Injectable()
export class GcsObjectsService {
  private readonly logger = new Logger(GcsObjectsService.name);

  constructor(private readonly gcsConfig: GcsConfig) {}

  private bucket() {
    const client = this.gcsConfig.getStorageClient();
    if (!client) throw new Error('Google Cloud Storage is not configured (GCS_PROJECT_ID / GCS_BUCKET_NAME)');
    return client.bucket(this.gcsConfig.getBucketName());
  }

  async uploadBuffer(path: string, data: Buffer, contentType: string): Promise<void> {
    await this.bucket().file(path).save(data, { contentType, resumable: false });
  }

  async uploadFile(path: string, localFile: string, contentType: string): Promise<void> {
    await pipeline(
      createReadStream(localFile),
      this.bucket().file(path).createWriteStream({ contentType, resumable: false }),
    );
  }

  async downloadToBuffer(path: string): Promise<Buffer> {
    const [buf] = await this.bucket().file(path).download();
    return buf;
  }

  async downloadToFile(path: string, localFile: string): Promise<void> {
    await pipeline(this.bucket().file(path).createReadStream(), createWriteStream(localFile));
  }

  /** Reads the first `bytes` bytes (for magic-byte sniffing). */
  async readHead(path: string, bytes = 64): Promise<Buffer> {
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      this.bucket()
        .file(path)
        .createReadStream({ start: 0, end: bytes - 1 })
        .on('data', (c: Buffer) => chunks.push(c))
        .on('end', () => resolve())
        .on('error', reject);
    });
    return Buffer.concat(chunks);
  }

  createReadStream(path: string): Readable {
    return this.bucket().file(path).createReadStream();
  }

  async head(path: string): Promise<ObjectHead | null> {
    const file = this.bucket().file(path);
    const [exists] = await file.exists();
    if (!exists) return null;
    const [meta] = await file.getMetadata();
    return { size: Number(meta.size), contentType: meta.contentType };
  }

  async deleteObject(path: string): Promise<void> {
    await this.bucket().file(path).delete({ ignoreNotFound: true });
  }

  /** Deletes every object under the prefix. Returns the number of objects deleted. */
  async deletePrefix(prefix: string): Promise<number> {
    if (!prefix || prefix === '/' || !prefix.endsWith('/')) {
      throw new Error('deletePrefix requires a non-empty prefix ending in "/"');
    }
    const [files] = await this.bucket().getFiles({ prefix });
    await Promise.all(files.map((f) => f.delete({ ignoreNotFound: true })));
    return files.length;
  }

  /** V4 signed GET URL. Never log the result. */
  async getSignedReadUrl(path: string, opts: SignedReadOptions = {}): Promise<string> {
    const [url] = await this.bucket()
      .file(path)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + (opts.expiresSeconds ?? 900) * 1000,
        responseDisposition: opts.downloadFilename
          ? `attachment; filename="${opts.downloadFilename.replace(/"/g, '')}"`
          : undefined,
        responseType: opts.contentType,
      });
    return url;
  }

  /** V4 signed PUT URL for direct browser uploads. Client must send the same Content-Type header. */
  async getSignedUploadUrl(path: string, contentType: string, expiresSeconds = 900): Promise<string> {
    const [url] = await this.bucket()
      .file(path)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + expiresSeconds * 1000,
        contentType,
      });
    return url;
  }

  /** Applies bucket CORS for the app origins (used by the setup script). */
  async setCors(origins: string[]): Promise<void> {
    await this.bucket().setCorsConfiguration([
      {
        origin: origins,
        method: ['GET', 'HEAD', 'PUT', 'OPTIONS'],
        responseHeader: ['Content-Type', 'Content-Length', 'Content-Range', 'Range', 'x-goog-resumable'],
        maxAgeSeconds: 3600,
      },
    ]);
  }
}
