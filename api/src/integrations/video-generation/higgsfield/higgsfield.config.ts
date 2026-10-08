// Higgsfield HTTP API description, verified against https://docs.higgsfield.ai (auth: `Key <id>:<secret>`).

export const HIGGSFIELD_CONFIG = {
  auth: {
    header: 'Authorization',
    /** Header value is `${scheme} ${HIGGSFIELD_API_KEY}`; use '' for a raw key header. */
    scheme: 'Key', // Higgsfield rejects `Bearer` with 401 "Invalid credentials"
  },

  /** Locked parameters for every clip (Kling 2.5 turbo image-to-video, 5 s). */
  generation: {
    duration: 5,
  },

  /** Verified against https://docs.higgsfield.ai (Key auth, model-path based API). */
  endpoints: {
    /** body { content_type } -> { public_url, upload_url, upload_headers } */
    uploadUrl: { method: 'POST', path: '/files/generate-upload-url' },
    /** One request per clip: body { prompt, image_url, duration } -> { request_id, status, status_url } */
    generateVideo: { method: 'POST', path: '/kling-video/v2.5-turbo/standard/image-to-video' },
    /** Same body as generateVideo -> { credits, usd } for this account (authoritative price, submits nothing) */
    estimate: { method: 'POST', path: '/estimate/kling-video/v2.5-turbo/standard/image-to-video' },
    /** GET -> { status, video?: { url } } ; statuses queued|in_progress|completed|failed|nsfw|canceled */
    requestStatus: (requestId: string) => ({ method: 'GET', path: `/requests/${encodeURIComponent(requestId)}/status` }),
  },

  /** Parallel submit / status calls. */
  concurrency: 4,
  requestTimeoutMs: 30_000,
  /** Signed read URL lifetime handed to the import call. */
  importUrlTtlSeconds: 15 * 60,
  maxClipBytes: 500 * 1024 * 1024,
} as const;

export type HiggsfieldEndpoint = { method: string; path: string };
