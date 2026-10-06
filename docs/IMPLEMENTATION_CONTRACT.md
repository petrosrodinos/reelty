# Reelty — Implementation Contract

Binding agreement between the API (NestJS, `api/`), the workers (`api/src/background`, `api/src/worker.ts`) and the web app (Next.js, `app/`). The product behaviour comes from `docs/Product_Specification.md` (the spec); visual design from `DESIGN.MD` and the interactive `mockup/` folder; code conventions from `.cursor/rules/*.mdc`. Where this file is more specific than the spec it wins.

Product name in UI and emails is **Reelty**.

## 0. Already in place (do not rewrite)

- `api/prisma/schema.prisma` — full data model (Prisma 7, client generated into `api/src/generated/prisma`, import as `generated/prisma`). Run `DATABASE_URL=postgresql://x:y@localhost:5432/z npx prisma generate` after any schema change. **There is no database URL yet: never run migrations or tests.** Do write a baseline SQL migration at the end with `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0001_init/migration.sql` (+ `migration_lock.toml` with `provider = "postgresql"`).
- `api/src/core/queues/queues.constants.ts` — queue names, job names, payload types, deterministic job-id builders, retry defaults, concurrency and domain `Limits`. Use these; extend rather than duplicate.
- `api/src/integrations/storage/gcs/storage-paths.ts` (`StoragePaths`) and `services/gcs-objects.service.ts` (`GcsObjectsService`: `uploadBuffer/uploadFile/downloadToBuffer/downloadToFile/readHead/createReadStream/head/deleteObject/deletePrefix/getSignedReadUrl/getSignedUploadUrl/setCors`) exported by `GcsIntegrationModule`.
- Dependencies installed in `api/`: argon2, cookie-parser, helmet, @nestjs/throttler, sharp, apify-client, archiver, ffmpeg-static, ffprobe-static, bullmq, @nestjs/bullmq, ioredis, @google-cloud/storage, resend, handlebars, zod, class-validator. Add anything else with `npm install` only if truly needed (agents run sequentially in `api/`, never run two `npm install` at once).
- Existing leftovers from a previous project (stripe, twilio, sms, elasticsearch, google-maps, graphql, ai, telegram, waitlist, `Document` model) are **out of scope**: delete the modules that do not belong to Reelty and their imports/env entries so `npm run build` is clean. Keep: config/env, prisma, redis, queues/bull-board, gcs, resend mail, health.

## 1. Conventions

- All JSON field names are `snake_case` (they mirror the Prisma model).
- Global prefix `/api`. Swagger UI at `/docs` (not under `/api`). Title "Reelty API".
- Errors, always: `{ "error": { "code": "snake_case_code", "message": "Human readable" } }` (global exception filter; validation errors use `code: "validation_error"` and may add `"fields": { "<field>": "<message>" }`).
- Paginated lists: `{ "data": [...], "pagination": { total, page, limit, total_pages, has_next, has_prev } }`.
- Ownership: any resource not owned by the caller returns **404** `not_found` (never 403).
- Dates are ISO-8601 strings.
- Signed URLs (V4, 15 min) are generated per request and **never stored or logged**.

## 2. Auth (cookies, spec §3.1)

- Cookies set by the API, all `httpOnly`, `SameSite=Lax`, `Secure` in production, `Domain=COOKIE_DOMAIN` if set:
  - `reelty_at` — access JWT, 15 min, path `/`.
  - `reelty_rt` — opaque refresh token (random 48 bytes, stored hashed with sha256 in `refresh_tokens`), 30 days, path `/api/auth`. **Rotating**: every refresh revokes the used token and issues a new one in the same `family_id`; re-use of a revoked token revokes the whole family.
  - `reelty_csrf` — **not** httpOnly, readable by JS, random value set at login/refresh/register.
- CSRF (double submit): every non-GET/HEAD/OPTIONS request that is authenticated by cookie must send header `X-CSRF-Token` equal to the `reelty_csrf` cookie, else 403 `csrf_failed`. Auth endpoints that run without a session (register, login, forgot/reset, verify, refresh) instead require `X-Requested-With: reelty` plus an `Origin`/`Referer` that is in the CORS allow-list when present. The web app sends both headers on every write.
- Passwords: argon2id, min 10 chars. Login rate limit: per IP (10/min) and per account (5 failures / 15 min then 429 `too_many_attempts`), via throttler + Redis counters. Registration with an existing email returns the same 201 shape as success-looking generic message (`{ "message": "If this email can be registered, we sent a verification link." }`) — no enumeration.
- JWT payload `{ sub: userId, role }`. `JwtGuard` reads the `reelty_at` cookie (and also accepts `Authorization: Bearer` for tooling). Use `@UseGuards(JwtGuard)`, `@CurrentUser()`; `RolesGuard` + `@Roles('ADMIN')` for admin routes.
- Email verification link: `${APP_URL}/verify?token=...` (24 h). Reset link: `${APP_URL}/reset?token=...` (1 h, one-time). Both tokens stored hashed.

Endpoints (all under `/api/auth`):

| Method & path | Body | Response |
|---|---|---|
| `POST /auth/register` | `{ email, password }` | 201 `{ message }` (generic). Also signs the user in (cookies) when the account was newly created. |
| `POST /auth/login` | `{ email, password }` | 200 `{ user: Me }` + cookies. 401 `invalid_credentials` (generic). |
| `POST /auth/logout` | – | 204, revokes refresh token, clears cookies |
| `POST /auth/refresh` | – (cookie) | 200 `{ user: Me }` + rotated cookies, 401 `invalid_refresh` |
| `POST /auth/verify-email` | `{ token }` | 200 `{ message }`; 400 `invalid_token` |
| `POST /auth/resend-verification` | – (auth required) | 200 `{ message }` (throttled 3/hour) |
| `POST /auth/forgot-password` | `{ email }` | 200 generic `{ message }` always |
| `POST /auth/reset-password` | `{ token, password }` | 200 `{ message }` (revokes all refresh tokens) |
| `GET /auth/me` | – | 200 `Me` |

```ts
Me = {
  id, email, role, email_verified: boolean, created_at,
  quota: { used: number, limit: number, remaining: number, resets_at: string }   // current calendar month, UTC
}
```

## 3. Project / image JSON shapes

```ts
type ProjectStatus = 'DRAFT'|'FETCHING'|'READY'|'QUEUED'|'CREATING'|'COMPLETED'|'FAILED';
type RenderStep = 'QUEUED'|'PREPARING'|'GENERATING'|'ASSEMBLING'|'UPLOADING'|'COMPLETED'|'FAILED'|'BLOCKED_NO_CREDITS';
type SourceType = 'website'|'airbnb'|'upload';
type RoomType = 'AUTO'|'EXTERIOR'|'LIVING_ROOM'|'KITCHEN'|'BEDROOM'|'BATHROOM'|'TERRACE_VIEW'|'OTHER';
type WatermarkStatus = 'none'|'processing'|'done'|'failed';

interface ProjectImage {
  id: string; position: number;            // 1-based, dense, removed images excluded
  width: number|null; height: number|null; bytes: number|null;
  room_type: RoomType;
  use_processed: boolean;                  // the version the video will use
  wm_status: WatermarkStatus; wm_attempts: number; wm_max_attempts: number;
  has_processed: boolean;
  is_duplicate: boolean;                   // another non-removed image in the project has the same content_hash
  low_resolution: boolean;                 // longest side < 1024
  clip_status: 'none'|'submitted'|'completed'|'failed';
  skipped: boolean;                        // listed in project.skipped_image_ids
  thumb_url: string|null;                  // signed, 480 px
  original_url: string|null;               // signed inline
  processed_url: string|null;              // signed inline, null when no processed version
}

interface Project {
  id: string; source_type: SourceType; source_url: string|null;
  status: ProjectStatus; render_step: RenderStep|null; partial: boolean;
  failure_reason: string|null;             // plain-language, safe to show
  failure_code: string|null;               // scrape_empty|scrape_failed|provider_timeout|too_few_clips|ffmpeg_error|blocked_no_credits|...
  title: string; subtitle: string|null; location_line: string|null; closing_line: string|null;
  music_enabled: boolean;
  rights_attested: boolean;                // rights_attested_at != null
  watermark_consent: boolean;              // a 'watermark' consent exists for this project
  submitted_at: string|null; completed_at: string|null;
  duration_seconds: number|null;
  clips_total: number; clips_done: number;
  poster_url: string|null;                 // signed, when completed
  image_count: number;                     // non-removed images
  estimated_duration_seconds: number;      // 8 + 5N - 0.8*(N+1), 0 when N < 3
  created_at: string; updated_at: string;
  images?: ProjectImage[];                 // only on GET /projects/:id
}
```

List items (`GET /projects`) are `Project` without `images`, but include `poster_url`, and up to 4 `preview_thumb_urls: string[]` (signed) for non-completed projects.

## 4. REST API (spec §9 + additions)

All routes below require auth except where noted. Writes need the CSRF header (section 2).

| Method & path | Notes |
|---|---|
| `POST /projects` | Body `{ source_type, source_url? }`. `website`: valid http(s) URL; `airbnb`: host `*.airbnb.*` and path `/rooms/<digits>` (tracking params stripped, search URLs rejected with `invalid_airbnb_url`); `upload`: no url. Creates project (`DRAFT`; link types become `FETCHING` and enqueue `scrape`). 201 `Project`. 409 `render_in_progress` is not applicable here. |
| `GET /projects` | Query `page` (1), `limit` (20, max 50), `status` (optional). Newest first, excludes `deleted_at`. |
| `GET /projects/:id` | `Project` with `images`. |
| `PATCH /projects/:id` | `title` (≤60), `subtitle` (≤80), `location_line` (≤80), `closing_line` (≤120), `music_enabled`. Rejected with 409 `project_locked` once submitted. |
| `DELETE /projects/:id` | 204. Cancels pending jobs best-effort, deletes all GCS objects under the project prefix, then the rows (hard delete). If a render is active, 409 `render_in_progress`. |
| `POST /projects/:id/images/upload-urls` | Body `{ files: [{ filename, content_type, size }] }` (1–12 per call). Validates type (jpeg/png/webp), size ≤ 20 MB, and that total non-removed + new ≤ `MAX_IMAGES`; creates `Image` rows (`ready=false`) and returns `{ uploads: [{ image_id, upload_url, content_type, expires_in }] }`. Client `PUT`s the bytes to `upload_url` with the same `Content-Type`. Project must be `DRAFT`/`READY`/`FETCHING`-finished (not locked). |
| `POST /projects/:id/images/confirm` | Body `{ image_ids: string[] }`. Server verifies each object (exists, size, magic bytes via `readHead`), measures with sharp (reject < 640 px shortest side → image removed + reported), computes `content_hash` (sha256 of bytes), creates 480 px `thumb.jpg`, sets `ready=true`, appends at the end. Returns `{ images: ProjectImage[], rejected: [{ image_id, code, message }] }`. If the project was `DRAFT` and now has ≥1 ready image, it moves to `READY`. |
| `PATCH /projects/:id/images/order` | Body `{ image_ids: string[] }` — must be exactly the set of non-removed images. Persists `position`. 204. |
| `PATCH /images/:id` | `{ room_type?, use_processed? }` (`use_processed` only true when a processed object exists). Returns `ProjectImage`. Locked after submit. |
| `DELETE /images/:id` | Soft delete (`removed=true`), re-pack positions. 204. If it would leave the project with 0 images the project returns to `DRAFT`. |
| `POST /images/:id/remove-watermark` | Body `{ accept_terms?: boolean }`. First use per project requires `accept_terms: true` (stores a `watermark` consent with ip) else 400 `consent_required`. Enforces `wm_attempts < 2` (409 `attempts_exhausted`), not already processing, system flag, project unlocked. Sets `wm_status=processing`, increments `wm_attempts`, enqueues `dewatermark` with `JobIds.dewatermark(imageId, attempt)`. Returns `ProjectImage`. |
| `POST /projects/:id/submit` | Body `{ rights_attested: true }` (required if not yet attested; stores `rights` consent). Validates: owner, email verified (403 `email_not_verified`), status `READY`, title non-empty, 3–12 non-removed `ready` images (400 `image_count_invalid`), none `processing` (409 `watermark_processing`), quota remaining (402 `quota_exceeded`), no other active render for the user (409 `render_in_progress`), system flag `renders_enabled`. In one transaction: lock (`submitted_at`, status `QUEUED`, `render_step=QUEUED`), write ledger `video` `quota_units=+1`, `quota_charged=true`. Then enqueue `render` with `JobIds.render(projectId)`. Returns `Project`. |
| `POST /projects/:id/retry` | Only `FAILED`. Re-checks quota (re-charges if it was refunded) and the one-active-render rule, resets failure fields, status `QUEUED`, keeps persisted per-image clip data (never double-charges), re-enqueues the render (job id gets a retry suffix: `render__<id>__r<n>`; the worker must treat any job for that project identically). Returns `Project`. |
| `GET /projects/:id/video/play-url` | `{ url, expires_in }` inline signed URL (only when `COMPLETED`, else 409 `video_not_ready`). |
| `GET /projects/:id/video/download-url` | `{ url, expires_in, filename }` attachment (`<slugified-title>.mp4`). |
| `GET /images/:id/download-url?version=original\|processed` | `{ url, expires_in, filename }`. |
| `GET /projects/:id/images/download-zip` | Streams `application/zip` (archiver, store-level compression) of the photos used, in video order, named `01-<room>.jpg` etc.; includes both original and processed (`01-original.jpg`, `01-processed.jpg`) where processed exists. Auth by cookie, `Content-Disposition: attachment`. |
| `GET /usage` | `Me.quota` shape plus `{ active_render_project_id: string|null }`. |
| `GET /health` | Public. DB + Redis check. |
| `GET /admin/queues` | Bull Board (existing basic-auth middleware). |
| `GET /admin/stats` , `PATCH /admin/flags` | `ADMIN` role only: queue depths and recent failures; toggle `renders_enabled`, `dewatermark_enabled`, `scrape_enabled`. |

Status transitions (owned by the API and workers exactly as in the spec): `DRAFT → FETCHING → READY` (scrape) or `DRAFT → READY` (upload), `READY → QUEUED → CREATING → COMPLETED|FAILED`. `render_step=BLOCKED_NO_CREDITS` keeps `status=CREATING` (UI shows "Delayed, we're on it").

## 5. Workers (spec §5, §10) — run in a separate process

- `BackgroundModule` (`api/src/background/background.module.ts`) hosts the processors and is imported by `AppModule`, so `npm run start*` runs API and workers together. Graceful SIGTERM shutdown (`app.enableShutdownHooks()`; `worker.close()` waits for the current job). To split later, bootstrap `BackgroundModule` in its own entry point and remove it from `AppModule`.
- Queues and job ids per `queues.constants.ts`. Payloads hold IDs only.
- Every job loads state from Postgres, is idempotent and resumable, and writes `JobEvent` rows for noteworthy transitions.
- Provider abstraction: `VideoGenerationProvider { importImage, getCost, submitClips, waitForJobs, downloadClip }` with a `HiggsfieldProvider` (HTTP client, configurable via `HIGGSFIELD_API_BASE_URL`/`HIGGSFIELD_API_KEY`; endpoint paths are an **assumption** pending spec Q1 and must live in one clearly commented config object) and a `LocalKenBurnsProvider` that renders each "clip" locally with ffmpeg `zoompan` from the still (selected with `VIDEO_PROVIDER=local|higgsfield`; default `local` when no Higgsfield key is configured). Both satisfy the same state machine so the rest of the pipeline is identical.
- Soundtrack: no third-party track is bundled. The worker synthesises one original ambient pad with ffmpeg (`aevalsrc`/`sine` chords + reverb-like `aecho`, ~60 s, loopable) on first use, caches it at `assets/soundtrack/track.mp3` in GCS with `LICENSE.txt` ("Generated by Reelty; dedicated to the public domain under CC0 1.0"), and re-downloads it to the worker's temp dir.
- ffmpeg/ffprobe paths: `FFMPEG_PATH`/`FFPROBE_PATH` env, else `ffmpeg-static`/`ffprobe-static`. Fonts: `FFMPEG_FONT_PATH` env, else a bundled path documented in the worker `Dockerfile` (`fonts-dejavu`/Inter).
- Emails (`notify` queue): `verify-email`, `reset-password`, `video-ready`, `video-failed` via the existing Resend integration, with a console-log fallback when `RESEND_API_KEY` is empty. Branded handlebars templates (cream/coral per DESIGN.MD) in `integrations/notifications/templates/`.

## 6. Web app (Next.js 16, shadcn/ui, `app/`)

Follow `.cursor/rules/app-shadcn-code-structure-and-best-practices.mdc` with one deviation: Next.js reserves `src/pages`, so route-level page components live in `src/views/<section>/` (thin `src/app/**/page.tsx` files just render them). Everything else (features data-only, `Routes`/`ApiRoutes` objects, dropdown options in `config/constants/dropdowns/`, `Skeleton` loading, `ConfirmationDialog`, `zodResolver`, toasts on every mutation, `cn()`, `@/` imports, const-object enums) applies as written.

Design: `DESIGN.MD` (cream canvas `#faf9f5`, coral `#cc785c`, dark surface `#181715`, serif display "Cormorant Garamond" 400/500 as the Copernicus substitute with negative tracking, Inter body, JetBrains Mono for code; radii 8/12/16; no pure white, no cool grays, no blue). Replace the starter's lime/Delitip tokens in `globals.css` and the Plus Jakarta/Geist fonts. Match the structure and copy of `mockup/` (landing, auth, My Videos, new video tabs, image manager, project status/detail).

Routes (`src/routes/routes.ts`): `home /`, `login /login`, `register /register`, `forgot /forgot`, `reset /reset`, `verify /verify`, `new /new`, `videos /videos`, `project(id) /projects/[id]`, `edit(id) /projects/[id]/edit`. Authenticated shell for `/new`, `/videos`, `/projects/**` (redirect to `/login?next=` on 401 after one refresh attempt); public: `/`, auth pages, plus `terms` and `privacy` placeholder pages.

HTTP: single `axiosInstance` with `baseURL = environments.apiUrl` (default `http://localhost:3000/api`), `withCredentials: true`, default headers `X-Requested-With: reelty`, request interceptor copying the `reelty_csrf` cookie into `X-CSRF-Token`, response interceptor doing one `POST /auth/refresh` retry on 401 then redirecting to login. Services unwrap `{ error: { message } }` into `Error(message)`.

Polling: `GET /projects/:id` and the list refetch every 5 s while any visible project status is `FETCHING`/`QUEUED`/`CREATING` (TanStack `refetchInterval`).

Uploads: request signed URLs → `PUT` each file directly to GCS with `XMLHttpRequest`/axios (progress) → `confirm`. Client pre-validates type/size and shows per-file progress and rejection reasons.

Mobile first: every screen must work at 360 px wide — hamburger nav below 768 px, single-column grids, image grid 2-up on phones, touch drag (dnd-kit with `TouchSensor` + `KeyboardSensor`, plus explicit "move left/right" buttons), bottom-sticky "Create video" bar on phones, no horizontal page scroll, 44 px touch targets on primary actions.

Required UI states (spec §11.3): loading skeletons, empty, error, partial success, offline retry, session expired, quota reached, provider delay (`BLOCKED_NO_CREDITS`).

Env: `NEXT_PUBLIC_API_URL`. `app/.env.example` documents it.

## 7. Ops deliverables

- `api/.env.template` updated with every variable (spec §18.1 + `COOKIE_DOMAIN`, `VIDEO_PROVIDER`, `HIGGSFIELD_*`, `APIFY_TOKEN`, `DEWATERMARK_API_KEY`, `FFMPEG_*`, `MAX_IMAGES`, `MIN_IMAGES`, `WM_MAX_ATTEMPTS`, `DEFAULT_MONTHLY_QUOTA`, `HIGGSFIELD_MAX_CLIP_CREDITS`, `RESEND_FROM`). All provider keys optional in the Zod env schema so the app boots without them (features degrade with clear error codes); `DATABASE_URL`, `JWT_SECRET` (min 32 chars outside local), `REDIS_URL` are required in staging/production.
- `api/Dockerfile` (API + workers, with ffmpeg + fonts), `app/Dockerfile` (Next standalone output), root `docker-compose.yml` (postgres, redis with `--maxmemory-policy noeviction`, api, app) and a root `README.md` with setup, env, GCS bucket + CORS setup (`npm run gcs:cors` script), legal checklist (spec §13.2) and the open questions the owner must still answer (Q1–Q7).
- `api/src/scripts/set-gcs-cors.ts` + npm script `gcs:cors`.
