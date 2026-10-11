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
    /** 0 to 1 (default 0.5): how strictly Kling follows the prompt. Higher keeps motion closer to what we ask for. */
    cfgScale: 0.8,
    /**
     * Sent as Kling's `negative_prompt` (the place where naming things to avoid works; in the main prompt it backfires).
     * Keeps the sky and every object still, fans stopped, and stops leaves or objects from appearing or flying.
     */
    negativePrompt:
      'moving clouds, fast clouds, moving sky, time-lapse, fast motion, moving objects, moving umbrella, moving decorations, ' +
      'spinning ceiling fan, rotating fan, flying leaves, falling leaves, floating particles, dust, petals, ' +
      'new objects appearing, plants growing, morphing, warping, flickering, people, text, watermark',
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
