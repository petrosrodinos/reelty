// =====================================================================================================
// Higgsfield HTTP API description  --  ASSUMPTION pending spec Q1
//
// The prototype drove Higgsfield through MCP tools (media_import_url, generate_video with get_cost,
// generate_video_batch, jobs_wait, balance). Whether and how the same operations are exposed as a
// plain HTTP API is NOT confirmed yet (spec §17.2 Q1). Everything that depends on that answer lives in
// this single object: paths, auth header, request field names and the locked generation parameters.
// Update it (and `higgsfield.parsers.ts` if response shapes differ) once Higgsfield confirms the API.
// =====================================================================================================

export const HIGGSFIELD_CONFIG = {
  auth: {
    header: 'Authorization',
    /** Header value is `${scheme} ${HIGGSFIELD_API_KEY}`; use '' for a raw key header. */
    scheme: 'Bearer',
  },

  /** Locked parameters, identical for every video (spec §10.3, TG §2 step 4). */
  generation: {
    model: 'cinematic_studio_video_v2',
    aspect_ratio: '16:9',
    duration: 5,
    genre: 'intimate',
    sound: 'off', // D4: our soundtrack is the only audio
    mediaRole: 'start_image',
  },

  /** Paths are relative to appConfig.higgsfield.baseUrl. */
  endpoints: {
    /** -> { balance | credits } */
    balance: { method: 'GET', path: '/v1/balance' },
    /** body { url, type: 'image' } -> { media_id } (URL must be HTTPS, payload <= 50 MB) */
    importMedia: { method: 'POST', path: '/v1/media/import' },
    /** body = generation params + { get_cost: true } -> { credits | cost }; submits nothing */
    generateVideo: { method: 'POST', path: '/v1/generate/video' },
    /** body { requests: [{ index, params }] } (1-12) -> { results: [{ index, job_id? , error? }] } */
    generateVideoBatch: { method: 'POST', path: '/v1/generate/video/batch' },
    /** body { job_ids, timeout_seconds } (<= 12 ids, <= 15 s) -> { jobs: [{ job_id, status, result_url?, error? }] } */
    jobsWait: { method: 'POST', path: '/v1/jobs/wait' },
  },

  /** Max requests per batch call (TG §2 step 4). */
  maxBatchSize: 12,
  /** Max job ids per wait call (TG §2 step 5). */
  maxWaitBatch: 12,
  waitTimeoutSeconds: 10,
  requestTimeoutMs: 30_000,
  /** Signed read URL lifetime handed to the import call. */
  importUrlTtlSeconds: 15 * 60,
  maxClipBytes: 500 * 1024 * 1024,
} as const;

export type HiggsfieldEndpoint = { method: string; path: string };
