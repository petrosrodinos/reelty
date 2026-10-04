# Product: Reelty

> Source of truth: `docs/Product_Specification.md` (v1.0 draft, 2 Oct 2026). This file is the short product view. For requirement IDs (FR-*), job rules, data model and API, go to the spec. The spec calls the app "PropertyReel" (placeholder); Reelty is the repo name.

## What it is

A web app that turns property photos into a cinematic walkthrough video. A registered user pastes a listing link (property website or Airbnb) or uploads photos. They curate the photos, choose music on or off, and submit. A background job generates the video, and the user comes back later to play and download it from **My Videos**.

## Who it is for

| Persona | Need |
|---|---|
| Real estate agent | Fast, professional listing video from existing listing photos |
| Short-term rental host (Airbnb) | Promo video from an Airbnb listing |
| Property owner / photographer | Upload own photos, get a video |

## Goals

1. Go from "listing link" to "finished MP4" with no video-editing skills.
2. The user controls which photos are used and in what order.
3. Long-running work never blocks the UI (BullMQ workers, resumable, retry-safe).
4. Every video and photo is stored durably in Google Cloud Storage and visible only to its owner.
5. Cost per video is predictable and capped (Higgsfield, Apify, Dewatermark credits).

## Non-goals (v1)

- Payments, subscriptions, invoicing (usage quotas only).
- Voiceover, captions, 9:16 output, multiple or custom music.
- Manual timeline editing.
- Team workspaces, sharing links.
- Native mobile apps (web must be responsive).

## Core user flow

1. Register, verify email, log in.
2. **New video**: pick a tab, **Website link**, **Airbnb link** or **Upload photos**.
3. Link tabs scrape photos (Apify) and copy them to our GCS. Never hotlink.
4. **Image manager**: remove, reorder, upload more, optional room type, optional per-image watermark removal with before/after.
5. **Video details**: title (required), subtitle, location/price line, closing line, music on/off.
6. Review summary (image count, estimated length, cost in quota units), tick the rights attestation, **Create video**.
7. User sees "Your video is being created. Come back later." The render runs in the background.
8. **My Videos**: play inline, download MP4, download the photos used (single or ZIP), retry if failed, delete.

Project statuses: `Draft`, `Fetching photos`, `Ready to edit`, `Queued`, `Creating video`, `Completed`, `Failed`.

## Key product decisions

| # | Decision |
|---|---|
| D1 | Three intake tabs; upload also available in the image manager at any time. |
| D2 | Watermark removal runs on user click per image (async), not silently at render time. |
| D3 | 3 to 12 images per video. |
| D4 | Clips generated with audio off. Music on adds our soundtrack; off gives a silent track. |
| D5 | One active render per user. |
| D6 | Output 16:9, 1920x1080, 30 fps, H.264/AAC MP4. |
| D7 | Email + password auth with email verification. No social login. |

## Feature summary

- **Auth**: register, verify, login, logout, password reset. argon2id, httpOnly cookies, rate limiting. Strict per-user ownership (other users get 404).
- **Intake**: URL validation (Airbnb must be a `/rooms/<id>` listing), upload of JPG/PNG/WebP up to 20 MB, live scrape progress, listing text pre-fills video details.
- **Image manager**: thumbnail grid, drag reorder with keyboard alternative, soft remove, 3 to 12 validation, duplicate flagging, room-type prompts, lightbox.
- **Watermark removal**: per image, max 2 attempts, original always kept, keep/revert, consent stored, Create disabled while processing.
- **Video**: title card (4 s), clips (5 s each), end card (4 s), 0.8 s crossfades, 1 s fade out. Expected duration `8 + 5N - 0.8 x (N + 1)` s.
- **Audio**: one built-in license-clean soundtrack with fades, or silent AAC track.
- **Library**: list, inline play, download, photo gallery and ZIP, retry, delete (removes all storage objects), signed 15-minute URLs.
- **Failure handling**: retry only failed clips; build the video from >= 3 successful clips and flag it partial; fewer than 3 means failed with quota refund; provider out of credits means "Delayed" and resumes without re-spending.

## Cost and abuse control

- Higgsfield clip about 7.5 credits each (10 images is about 75). Always read `get_cost`, never hard-code.
- Apify Airbnb scraper about $0.005 per listing. Dewatermark 1 credit per image.
- Monthly quota per user (default 3), failed renders refund. Max 12 images, 2 watermark attempts per image, one active render per user, global kill switch.

## Stack (suggested)

Next.js + TypeScript frontend, Node/TypeScript API, BullMQ on Redis, PostgreSQL, Google Cloud Storage with V4 signed URLs, separate scrape / image / render workers (FFmpeg), Secret Manager, Sentry. Providers: Apify, Dewatermark, Higgsfield, a transactional email service.

## Performance targets

Scrape p95 under 2 min, watermark removal p95 under 30 s per image, 10-image render p95 under 15 min, API p95 under 300 ms, library page under 2 s.

## Legal and compliance (review before launch)

- Rights attestation before first render; watermark-editing confirmation; both stored.
- Scraping third-party sites (including Airbnb) may breach their terms or photo copyright. Needs legal review, robots.txt respected, consider limiting to authorized listings.
- Terms must prohibit removing others' watermarks and state output is AI-generated and may differ from the real property.
- Soundtrack must have a documented commercial-use license.
- GDPR-style export and deletion; privacy policy lists processors.

## Delivery plan

| Phase | Scope | Estimate |
|---|---|---|
| 0 | Repo, CI, infra, spikes S1 to S5 | 1 wk |
| 1 | Auth, projects, upload, image manager | 1.5 wk |
| 2 | Apify intake, filtering, copy to GCS | 1 wk |
| 3 | Watermark removal flow | 1 wk |
| 4 | Render pipeline, music, QA gate | 2 wk |
| 5 | My Videos, downloads, ZIP, delete, emails | 1 wk |
| 6 | Hardening, load test, admin tools, legal copy | 1 wk |

Spikes first: S1 programmatic Higgsfield access, S2 server download of Higgsfield results, S3 Dewatermark quality, S4 generic web-scraper hit rate, S5 FFmpeg time and memory.

## Open questions

| # | Question | Needed by |
|---|---|---|
| Q1 | How does the backend call Higgsfield (supported API or MCP client with service credentials, commercial terms, rate limits)? | Phase 0 |
| Q2 | Which royalty-free track and license? | Phase 4 |
| Q3 | Free quota per user and paid plan timing? | Phase 5 |
| Q4 | Email provider and sender domain? | Phase 1 |
| Q5 | Limit scraping to listings the user is authorized for? | Phase 2 |
| Q6 | Retention of finished videos? | Phase 5 |
| Q7 | Target markets (localization, GDPR scope)? | Phase 0 |
