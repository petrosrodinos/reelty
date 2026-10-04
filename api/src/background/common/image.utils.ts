import { createHash } from 'crypto';
import sharp = require('sharp');

export type SniffedImageType = 'jpeg' | 'png' | 'webp' | 'avif';

/** Magic-byte sniffing (never trust the extension or the Content-Type alone). */
export function sniffImageType(buf: Buffer): SniffedImageType | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (buf.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buf.toString('ascii', 8, 12);
    if (brand === 'avif' || brand === 'avis') return 'avif';
  }
  return null;
}

export const sha256Hex = (buf: Buffer) => createHash('sha256').update(buf).digest('hex');

export interface NormalizedImage {
  data: Buffer;
  width: number;
  height: number;
}

export interface NormalizeOptions {
  /** Longest side limit (default 4096). */
  maxSide?: number;
  quality?: number;
  /** Reject when the shortest side is below this (default 0 = accept). */
  minShortSide?: number;
}

export class ImageTooSmallError extends Error {
  constructor(readonly width: number, readonly height: number) {
    super('Image is too small');
    this.name = 'ImageTooSmallError';
  }
}

/**
 * Validates (sharp must be able to decode it), auto-orients, flattens transparency on white, caps the
 * longest side and re-encodes to JPEG. Metadata (EXIF/GPS) is dropped.
 */
export async function normalizeToJpeg(input: Buffer, opts: NormalizeOptions = {}): Promise<NormalizedImage> {
  const maxSide = opts.maxSide ?? 4096;
  const pipeline = sharp(input, { failOn: 'error', limitInputPixels: 150_000_000 })
    .rotate()
    .flatten({ background: '#ffffff' });

  const meta = await sharp(input, { limitInputPixels: 150_000_000 }).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const w0 = (swap ? meta.height : meta.width) ?? 0;
  const h0 = (swap ? meta.width : meta.height) ?? 0;
  if (!w0 || !h0) throw new Error('Unreadable image');
  if (opts.minShortSide && Math.min(w0, h0) < opts.minShortSide) throw new ImageTooSmallError(w0, h0);

  const { data, info } = await pipeline
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: opts.quality ?? 90, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/** 480 px (longest side) JPEG thumbnail for the image grid. */
export async function makeThumbnail(input: Buffer, size = 480): Promise<Buffer> {
  return sharp(input, { failOn: 'error' })
    .rotate()
    .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}
