# Reelty API

NestJS API for Reelty: paste a listing link or upload photos, curate them, and get a cinematic walkthrough video.
The API only handles HTTP and enqueues jobs; scraping, watermark removal, rendering and emails run in a separate
worker process (`src/worker.ts`, `src/background/`). Binding contract: `../docs/IMPLEMENTATION_CONTRACT.md`.

## Stack

NestJS 11, Prisma 7 (PostgreSQL), BullMQ on Redis, Google Cloud Storage (V4 signed URLs), argon2id + cookie sessions.

## Local development

```bash
cp .env.template .env.local        # or use .env.staging, which has working integration keys
npm install
npx prisma generate                # client is generated into src/generated/prisma
npm run migrate:local              # needs DATABASE_URL, creates/updates the schema
npm run start:staging              # API on http://localhost:3000/api, Swagger on /docs
npm run start:worker:staging       # workers (separate terminal)
```

- Swagger UI: `/docs` (outside the `/api` prefix). Bull Board: `/admin/queues` (basic auth, `BULL_BOARD_USER` / `BULL_BOARD_PASSWORD`).
- All environment variables are documented in `.env.template`. Provider keys are optional; features degrade with
  clear error codes. `DATABASE_URL`, `REDIS_URL` and `JWT_SECRET` (min 32 chars) are required in staging/production.
- Redis must run with `maxmemory-policy noeviction` (BullMQ requirement).

## Auth model

Cookies set by the API: `reelty_at` (15 min), `reelty_rt` (30 days, rotating, path `/api/auth`), `reelty_csrf`
(readable by JS). Writes need `X-CSRF-Token` (copy of `reelty_csrf`); session-less auth endpoints need
`X-Requested-With: reelty`. Errors are always `{ "error": { "code", "message", "fields"? } }`.

## Useful scripts

| Script | Purpose |
|---|---|
| `npm run build` / `npm run start:prod` | Compile and run (`node dist/src/main`) |
| `npm run migrate:prod` | `prisma migrate deploy` (uses `DATABASE_URL` from the environment) |
| `npm run gcs:cors` | Apply bucket CORS for the app origins (`CORS_URLS` / `APP_URL`, or pass origins as arguments) |

## Docker and migrations

`Dockerfile` builds the API image (node 22, multi-stage). **The image CMD does not run `prisma migrate deploy`.**
Apply migrations as an explicit release step:

```bash
docker build --target migrate -t reelty-api-migrate .
docker run --rm -e DATABASE_URL=postgresql://... reelty-api-migrate
```

The baseline schema is `prisma/migrations/0001_init`.
