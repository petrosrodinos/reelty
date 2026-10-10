// Pure helpers for the scrape pipeline (spec §10.1): URL filtering, size-variant de-duplication,
// listing text extraction. No I/O.
import { Limits } from '@/core/queues/queues.constants';

// ---------------------------------------------------------------------------
// Apify inputs
// ---------------------------------------------------------------------------

/** Page function for `apify/web-scraper` (spec §10.1), plus the og:description needed for the text prefill. */
export const WEBSITE_PAGE_FUNCTION = `async function pageFunction(context) {
  const urls = new Set();
  const add = (u) => { if (u && /^https?:/.test(u)) urls.add(u); };
  document.querySelectorAll('img').forEach(img => {
    add(img.currentSrc || img.src);
    add(img.dataset.src); add(img.dataset.lazySrc); add(img.dataset.original);
  });
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    const m = bg && bg.match(/url\\(["']?(https?[^"')]+)/);
    if (m) add(m[1]);
  });
  document.querySelectorAll('meta[property="og:image"]').forEach(m => add(m.content));
  return {
    url: context.request.url,
    title: document.title,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
    ogDescription: document.querySelector('meta[property="og:description"]')?.content || null,
    h1: document.querySelector('h1')?.innerText || null,
    images: [...urls],
  };
}`;

export function buildWebsiteActorInput(url: string): Record<string, unknown> {
  return {
    startUrls: [{ url }],
    pageFunction: WEBSITE_PAGE_FUNCTION,
    proxyConfiguration: { useApifyProxy: true },
    respectRobotsTxtFile: true,
    maxPagesPerCrawl: 1,
    linkSelector: '',
    pseudoUrls: [],
    maxScrollHeightPixels: 20000,
    injectJQuery: false,
  };
}

export function buildAirbnbActorInput(roomId: string): Record<string, unknown> {
  return { startUrls: [{ url: `https://www.airbnb.com/rooms/${roomId}` }] };
}

/** Extracts the numeric room id from an Airbnb listing URL (`*.airbnb.*` + `/rooms/<digits>`). */
export function extractAirbnbRoomId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (!/(^|\.)airbnb\.[a-z.]+$/i.test(u.hostname)) return null;
    const m = u.pathname.match(/\/rooms\/(\d+)(?:\/|$)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Image URL filtering
// ---------------------------------------------------------------------------

const BAD_EXTENSIONS = new Set(['svg', 'gif', 'ico', 'cur', 'bmp', 'tif', 'tiff', 'mp4', 'webm', 'pdf', 'js', 'css', 'html']);

/** Whole path tokens (split on non-alphanumerics) that mark non-gallery media. */
const HINT_TOKENS = new Set([
  'logo', 'logos', 'icon', 'icons', 'avatar', 'avatars', 'flag', 'flags', 'sprite', 'sprites',
  'favicon', 'pixel', 'tracking', 'tracker', 'badge', 'badges', 'placeholder', 'blank', 'spacer',
  'loader', 'loading', 'btn', 'button', 'arrow', 'arrows', 'social', 'facebook', 'twitter', 'instagram',
  'whatsapp', 'linkedin', 'youtube', 'payment', 'visa', 'mastercard', 'paypal', 'headshot', 'qrcode',
  'emoji',
]);

const BAD_HOSTS = [
  'google-analytics.com', 'googletagmanager.com', 'doubleclick.net', 'facebook.com', 'facebook.net',
  'maps.googleapis.com', 'maps.gstatic.com', 'tile.openstreetmap.org', 'api.mapbox.com', 'gravatar.com',
];

const MAP_PATH = /\/(tiles?|staticmap|static-map|mapimage)\//i;

/** Query parameters that only change the rendition of an image, not its identity. */
const SIZE_QUERY_KEYS = new Set([
  'w', 'h', 'width', 'height', 'im_w', 'im_h', 'imwidth', 'maxwidth', 'maxheight', 'size', 'resize',
  'fit', 'crop', 'dpr', 'q', 'quality', 'format', 'fm', 'auto', 'scale', 'sz',
]);

const SIZE_SUFFIX = /[-_](\d{2,5})x(\d{2,5})(?=\.[a-z0-9]+$|$)/i;

export interface InferredSize {
  width: number;
  height: number;
}

/** Best-effort pixel size from `-300x200` filename suffixes or `w=`/`width=` style query params. */
export function inferSizeFromUrl(u: URL): InferredSize | null {
  const m = u.pathname.match(SIZE_SUFFIX);
  if (m) return { width: Number(m[1]), height: Number(m[2]) };
  const q = (...keys: string[]) => {
    for (const k of keys) {
      const v = Number(u.searchParams.get(k));
      if (Number.isFinite(v) && v > 0) return v;
    }
    return null;
  };
  const w = q('w', 'width', 'im_w', 'imwidth', 'maxwidth');
  const h = q('h', 'height', 'im_h', 'maxheight');
  if (w && h) return { width: w, height: h };
  if (w) return { width: w, height: Math.round((w * 2) / 3) }; // assume ~3:2 when only one side is known
  if (h) return { width: Math.round((h * 3) / 2), height: h };
  return null;
}

/** Identity of a photo regardless of its rendition (size suffix / size query params removed). */
export function canonicalImageKey(u: URL): string {
  const path = u.pathname.replace(SIZE_SUFFIX, '');
  const kept = [...u.searchParams.entries()]
    .filter(([k]) => !SIZE_QUERY_KEYS.has(k.toLowerCase()))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return `${u.hostname.toLowerCase()}${path}${kept ? `?${kept}` : ''}`;
}

function safeDecode(v: string): string {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

/** Why a URL was rejected (null = acceptable). Exported for unit tests. */
export function rejectReason(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return 'invalid';
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return 'scheme';
  const host = u.hostname.toLowerCase();
  if (BAD_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) return 'host';
  if (MAP_PATH.test(u.pathname)) return 'map';

  const lastSegment = u.pathname.split('/').pop() ?? '';
  const ext = lastSegment.includes('.') ? lastSegment.split('.').pop()!.toLowerCase() : '';
  if (ext && BAD_EXTENSIONS.has(ext)) return 'extension';
  const tokens = safeDecode(u.pathname).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.some((t) => HINT_TOKENS.has(t))) return 'hint';

  return null;
}

export interface CandidateOptions {
  cap?: number;
}

/**
 * Filters and de-duplicates scraped image URLs (spec §10.1):
 *  - http(s) only; drops SVG/GIF/ICO, tracking pixels, icons/logos/avatars/flags/sprites, map tiles;
 *  - collapses size variants of the same photo (`-300x200` suffixes, `w=`/`im_w=` params) keeping the largest;
 *  - keeps first-seen order and caps the list (30).
 */
export function filterImageCandidates(urls: string[], opts: CandidateOptions = {}): string[] {
  const cap = opts.cap ?? Limits.MAX_SCRAPE_CANDIDATES;
  interface Entry {
    url: string;
    area: number;
    order: number;
  }
  const best = new Map<string, Entry>();
  let order = 0;
  for (const raw of urls) {
    if (typeof raw !== 'string') continue;
    // normalise first so that e.g. Airbnb `im_w=720` renditions are upgraded instead of rejected as small
    const trimmed = normalizeCandidateUrl(raw.trim());
    if (!trimmed || rejectReason(trimmed)) continue;
    const u = new URL(trimmed);
    const key = canonicalImageKey(u);
    const size = inferSizeFromUrl(u);
    // unknown size is assumed to be the original (largest) rendition
    const area = size ? size.width * size.height : Number.MAX_SAFE_INTEGER / 2;
    const existing = best.get(key);
    if (!existing) {
      best.set(key, { url: trimmed, area, order: order++ });
    } else if (area > existing.area) {
      best.set(key, { url: trimmed, area, order: existing.order });
    }
  }
  return [...best.values()]
    .sort((a, b) => a.order - b.order)
    .slice(0, cap)
    .map((e) => e.url);
}

/** Site-specific upgrades: Airbnb's CDN serves any width, so ask for a large rendition. */
export function normalizeCandidateUrl(raw: string): string {
  try {
    const u = new URL(raw);
    if (u.hostname.endsWith('muscache.com')) {
      u.searchParams.set('im_w', '1200');
      return u.toString();
    }
  } catch {
    /* keep as is */
  }
  return raw;
}

// ---------------------------------------------------------------------------
// Listing text -> project prefill
// ---------------------------------------------------------------------------

export interface ListingText {
  title: string | null;
  subtitle: string | null;
  location_line: string | null;
}

/** Trims to `max` characters on a word boundary, adding an ellipsis when shortened. */
export function fitLength(text: string | null | undefined, max: number): string | null {
  const t = (text ?? '').replace(/\s+/g, ' ').trim();
  if (!t) return null;
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:|\-–—]+$/, '')}…`;
}

/** Removes a trailing " | Site name" / " - Site name" segment from page titles. */
export function cleanPageTitle(title: string | null | undefined): string | null {
  const t = (title ?? '').replace(/\s+/g, ' ').trim();
  if (!t) return null;
  const m = t.match(/^(.{8,}?)\s+[|\-–—·]\s+([^|\-–—·]{2,30})$/);
  return (m ? m[1] : t).trim();
}

const SIZE_RE = /(\d{2,4}(?:[.,]\d+)?)\s?(m²|m2|sq\.?\s?m|sqm|sq\.?\s?ft|sqft|ft²)/i;
const BEDROOMS_RE = /(\d{1,2})\s?(?:bed(?:room)?s?|br\b|υπνοδωμάτι\w*|dormitori\w*)/i;
const PRICE_RE =
  /(?:(?:€|\$|£)\s?\d{1,3}(?:[.,\s]\d{3})*(?:[.,]\d+)?|\d{1,3}(?:[.,]\d{3})+\s?(?:€|EUR|USD|GBP|£|\$))/;

/** Pulls size / bedrooms (subtitle) and a price (location line) out of free text. Conservative on purpose. */
export function extractFacts(text: string): { subtitle: string | null; price: string | null } {
  const size = text.match(SIZE_RE);
  const beds = text.match(BEDROOMS_RE);
  const price = text.match(PRICE_RE);
  const bits: string[] = [];
  if (beds) bits.push(`${beds[1]} bed${beds[1] === '1' ? '' : 's'}`);
  if (size) bits.push(`${size[1]} ${size[2].toLowerCase().replace('m2', 'm²').replace(/\s+/g, ' ')}`);
  return { subtitle: bits.length ? bits.join(' | ') : null, price: price ? price[0].trim() : null };
}

export interface WebsiteItem {
  url?: string;
  title?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  h1?: string | null;
  images?: string[];
}

export function extractWebsiteListingText(item: WebsiteItem): ListingText {
  const title = fitLength(cleanPageTitle(item.h1) ?? cleanPageTitle(item.ogTitle) ?? cleanPageTitle(item.title), 60);
  const blob = [item.h1, item.ogTitle, item.title, item.ogDescription].filter(Boolean).join(' · ');
  const facts = extractFacts(blob);
  return {
    title,
    subtitle: fitLength(facts.subtitle, 80),
    location_line: fitLength(facts.price, 80),
  };
}

export interface AirbnbItem {
  title?: string | null;
  location?: unknown;
  description?: string | null;
  propertyType?: string | null;
  thumbnail?: string | null;
  images?: Array<{ imageUrl?: string | null; caption?: string | null } | string>;
}

function formatLocation(loc: unknown): string | null {
  if (!loc) return null;
  if (typeof loc === 'string') return loc;
  if (typeof loc === 'object') {
    const o = loc as Record<string, unknown>;
    const parts = ['neighborhood', 'city', 'state', 'country']
      .map((k) => (typeof o[k] === 'string' ? (o[k] as string) : ''))
      .filter(Boolean);
    const seen = new Set<string>();
    const unique = parts.filter((p) => (seen.has(p) ? false : (seen.add(p), true)));
    if (unique.length) return unique.slice(-2).join(', ');
    const fallback = ['address', 'name', 'title'].map((k) => o[k]).find((v) => typeof v === 'string');
    return (fallback as string) ?? null;
  }
  return null;
}

export function extractAirbnbListingText(item: AirbnbItem): ListingText {
  return {
    title: fitLength(item.title, 60),
    subtitle: fitLength(item.propertyType, 80),
    location_line: fitLength(formatLocation(item.location), 80),
  };
}

export function airbnbImageUrls(item: AirbnbItem): string[] {
  const out: string[] = [];
  for (const img of item.images ?? []) {
    if (typeof img === 'string') out.push(img);
    else if (img?.imageUrl) out.push(img.imageUrl);
  }
  if (out.length === 0 && item.thumbnail) out.push(item.thumbnail);
  return out;
}
