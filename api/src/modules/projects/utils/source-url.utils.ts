import { HttpStatus } from '@nestjs/common';
import { ApiException } from '@/shared/errors/api-exception';
import { ErrorCodes } from '@/shared/config/error-codes';

const MAX_URL_LENGTH = 2048;

const BLOCKED_SUFFIXES = [
  '.localhost',
  '.local',
  '.internal',
  '.localdomain',
  '.lan',
  '.home.arpa',
  '.intranet',
  '.corp',
  '.private',
];

function parseIPv4(host: string): number[] | null {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!match) return null;
  const parts = match.slice(1).map(Number);
  return parts.every((p) => p >= 0 && p <= 255) ? parts : null;
}

function isPrivateIPv4(parts: number[]): boolean {
  const [a, b, c] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) || // CGNAT
    (a === 169 && b === 254) || // link-local / cloud metadata
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224 // multicast / reserved
  );
}

function isPrivateIPv6(address: string): boolean {
  const host = address.toLowerCase();
  if (host === '::' || host === '::1') return true;

  const mapped = /^::ffff:(.+)$/.exec(host);
  if (mapped) {
    const tail = mapped[1];
    const dotted = parseIPv4(tail);
    if (dotted) return isPrivateIPv4(dotted);
    const hex = /^([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(tail);
    if (hex) {
      const hi = parseInt(hex[1], 16);
      const lo = parseInt(hex[2], 16);
      return isPrivateIPv4([hi >> 8, hi & 255, lo >> 8, lo & 255]);
    }
    return true;
  }

  return (
    /^f[cd]/.test(host) || // unique local fc00::/7
    /^fe[89ab]/.test(host) || // link-local fe80::/10
    /^fe[c-f]/.test(host) || // site-local / multicast
    /^ff/.test(host)
  );
}

/** True for hostnames that obviously point at a private / loopback / internal target. */
export function isPrivateHostname(rawHostname: string): boolean {
  const hostname = rawHostname.toLowerCase().replace(/\.$/, '');

  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    return isPrivateIPv6(hostname.slice(1, -1));
  }

  const ipv4 = parseIPv4(hostname);
  if (ipv4) return isPrivateIPv4(ipv4);

  if (hostname === 'localhost') return true;
  if (!hostname.includes('.')) return true; // single-label intranet names
  return BLOCKED_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
}

function invalid(code: string, message: string): ApiException {
  return new ApiException(HttpStatus.BAD_REQUEST, code, message);
}

/** Validates a property-website link: http(s) only, no credentials, no private hosts. */
export function normalizeWebsiteUrl(input: string | undefined): string {
  const message = 'Enter a valid web address starting with http:// or https://.';
  if (!input || typeof input !== 'string' || input.length > MAX_URL_LENGTH) {
    throw invalid(ErrorCodes.INVALID_URL, message);
  }

  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw invalid(ErrorCodes.INVALID_URL, message);
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw invalid(ErrorCodes.INVALID_URL, message);
  }
  if (url.username || url.password) {
    throw invalid(ErrorCodes.INVALID_URL, 'Web addresses with a username or password are not supported.');
  }
  if (isPrivateHostname(url.hostname)) {
    throw invalid(ErrorCodes.INVALID_URL, 'This web address cannot be used.');
  }

  url.hash = '';
  return url.toString();
}

const AIRBNB_HOST = /(^|\.)airbnb\.(com?\.[a-z]{2}|[a-z]{2,})$/i;
const AIRBNB_ROOM_PATH = /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?rooms\/(\d{4,})\/?$/i;

export interface ParsedAirbnbUrl {
  listing_id: string;
  url: string;
}

/**
 * Accepts https://*.airbnb.*\/rooms/<digits> and returns the canonical listing URL with
 * every query parameter and fragment (tracking) stripped. Search URLs are rejected.
 */
export function parseAirbnbUrl(input: string | undefined): ParsedAirbnbUrl {
  const message =
    'Paste the link of a single Airbnb listing, like https://www.airbnb.com/rooms/12345678. Search result links are not supported.';
  if (!input || typeof input !== 'string' || input.length > MAX_URL_LENGTH) {
    throw invalid(ErrorCodes.INVALID_AIRBNB_URL, message);
  }

  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw invalid(ErrorCodes.INVALID_AIRBNB_URL, message);
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw invalid(ErrorCodes.INVALID_AIRBNB_URL, message);
  }
  if (url.username || url.password || !AIRBNB_HOST.test(url.hostname)) {
    throw invalid(ErrorCodes.INVALID_AIRBNB_URL, message);
  }

  const match = AIRBNB_ROOM_PATH.exec(url.pathname);
  if (!match) {
    throw invalid(ErrorCodes.INVALID_AIRBNB_URL, message);
  }

  const listingId = match[1];
  return { listing_id: listingId, url: `https://${url.hostname.toLowerCase()}/rooms/${listingId}` };
}

/** `Lovely Villa, Athens!` -> `lovely-villa-athens` (safe for Content-Disposition filenames). */
export function slugify(value: string, fallback = 'reelty-video', maxLength = 60): string {
  const slug = value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '');
  return slug || fallback;
}
