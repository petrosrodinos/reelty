# syntax=docker/dockerfile:1
#
# Reelty API image (HTTP only; the worker has its own Dockerfile.worker).
#
# IMPORTANT: the image CMD does NOT run `prisma migrate deploy`. Apply migrations as a
# separate, explicit release step so a crash-looping API never races with schema changes:
#
#   docker build --target migrate -t reelty-api-migrate ./api
#   docker run --rm -e DATABASE_URL=postgresql://... reelty-api-migrate
#
# (or run `npm run migrate:prod` from CI with DATABASE_URL set).

FROM node:22-bookworm-slim AS base
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# ---- all dependencies (build + prisma CLI) -------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- compile ----------------------------------------------------------------------------
FROM deps AS build
COPY . .
# Prisma only needs a syntactically valid URL to generate the client; it is not used at runtime.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npx prisma generate && npm run build

# ---- one-off migration runner (docker build --target migrate) ---------------------------
FROM build AS migrate
CMD ["npx", "prisma", "migrate", "deploy"]

# ---- production dependencies only -----------------------------------------------------
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---- runtime --------------------------------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/src/main"]
