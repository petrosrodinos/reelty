# Reelty

Turn property photos into a cinematic walkthrough video. Paste a listing link (website or Airbnb) or upload photos, curate them, and a background job renders a 1080p MP4 you can play and download from **My Videos**.

- Product: [`PRODUCT.md`](PRODUCT.md), full spec [`docs/Product_Specification.md`](docs/Product_Specification.md)
- Design: [`DESIGN.MD`](DESIGN.MD), interactive mockup in [`mockup/`](mockup)
- API/worker/web contract: [`docs/IMPLEMENTATION_CONTRACT.md`](docs/IMPLEMENTATION_CONTRACT.md)

## Layout

| Path | What |
|---|---|
| `api/` | NestJS API (`src/main.ts`) and BullMQ worker (`src/worker.ts`), Prisma/PostgreSQL |
| `app/` | Next.js 16 + shadcn/ui web app |
| `docker-compose.yml` | Postgres, Redis (`noeviction`), API, worker, web |

## Setup

1. `cp api/.env.template api/.env.staging` and fill it in. Required: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET` (32+ chars). Provider keys are optional; features degrade with clear errors without them.
2. `cd api && npm install && npx prisma migrate deploy`
3. API: `npm run start:staging`. Worker (separate process): `npm run start:worker:staging`.
4. Web: `cd app && cp .env.example .env.local && npm install && npm run dev` (port 3001).
5. Everything at once: `docker compose up --build`.

### Google Cloud Storage
Create one private bucket (uniform access, no public access), set `GCS_PROJECT_ID`, `GCS_BUCKET_NAME` and credentials (Workload Identity in production, or `GCS_CREDENTIALS_JSON_BASE64` locally), then run `npm run gcs:cors` in `api/` to allow browser uploads from the app origins.

### Video provider
`VIDEO_PROVIDER=local` renders clips locally with FFmpeg (default without a Higgsfield key). `higgsfield` uses the HTTP client in `api/src/background/render/**/higgsfield.config.ts`; its endpoints are **assumptions** until Q1 below is answered.

## Open items before launch (spec §13.2, §17.2)

- **Q1** How the backend calls Higgsfield (supported API, commercial terms, rate limits).
- **Q2** Soundtrack: a CC0 ambient track is synthesised by the worker; replace it if you license a different one.
- **Q3–Q7** Free quota, email sender domain, scraping restrictions (legal review of Airbnb/website scraping), video retention, target markets.
- Terms and privacy pages are drafts and need legal review.
- Tests are intentionally not included yet (no database available at build time).
