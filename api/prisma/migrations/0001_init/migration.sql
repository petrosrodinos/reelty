-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AuthRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('website', 'airbnb', 'upload');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'FETCHING', 'READY', 'QUEUED', 'CREATING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "RenderStep" AS ENUM ('QUEUED', 'PREPARING', 'GENERATING', 'ASSEMBLING', 'UPLOADING', 'COMPLETED', 'FAILED', 'BLOCKED_NO_CREDITS');

-- CreateEnum
CREATE TYPE "WatermarkStatus" AS ENUM ('none', 'processing', 'done', 'failed');

-- CreateEnum
CREATE TYPE "ClipStatus" AS ENUM ('none', 'submitted', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('AUTO', 'EXTERIOR', 'LIVING_ROOM', 'KITCHEN', 'BEDROOM', 'BATHROOM', 'TERRACE_VIEW', 'OTHER');

-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('rights', 'watermark');

-- CreateEnum
CREATE TYPE "LedgerKind" AS ENUM ('video', 'video_refund', 'dewatermark', 'scrape', 'higgsfield');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "AuthRole" NOT NULL DEFAULT 'USER',
    "email_verified_at" TIMESTAMP(3),
    "monthly_video_quota" INTEGER NOT NULL DEFAULT 3,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "family_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "user_agent" TEXT,
    "ip" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "source_type" "SourceType" NOT NULL,
    "source_url" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "render_step" "RenderStep",
    "partial" BOOLEAN NOT NULL DEFAULT false,
    "failure_reason" TEXT,
    "failure_code" TEXT,
    "scrape_error" TEXT,
    "title" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT,
    "location_line" TEXT,
    "closing_line" TEXT,
    "music_enabled" BOOLEAN NOT NULL DEFAULT true,
    "rights_attested_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "render_started_at" TIMESTAMP(3),
    "quota_charged" BOOLEAN NOT NULL DEFAULT false,
    "video_gcs_path" TEXT,
    "poster_gcs_path" TEXT,
    "duration_seconds" DOUBLE PRECISION,
    "clips_total" INTEGER NOT NULL DEFAULT 0,
    "clips_done" INTEGER NOT NULL DEFAULT 0,
    "skipped_image_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "gcs_original_path" TEXT,
    "gcs_processed_path" TEXT,
    "gcs_thumb_path" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "bytes" INTEGER,
    "content_hash" TEXT,
    "source_url" TEXT,
    "room_type" "RoomType" NOT NULL DEFAULT 'AUTO',
    "use_processed" BOOLEAN NOT NULL DEFAULT false,
    "wm_status" "WatermarkStatus" NOT NULL DEFAULT 'none',
    "wm_attempts" INTEGER NOT NULL DEFAULT 0,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "ready" BOOLEAN NOT NULL DEFAULT false,
    "higgsfield_media_id" TEXT,
    "clip_job_id" TEXT,
    "clip_status" "ClipStatus" NOT NULL DEFAULT 'none',
    "clip_result_url" TEXT,
    "clip_gcs_path" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consents" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "type" "ConsentType" NOT NULL,
    "accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,

    CONSTRAINT "consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_events" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "job_name" TEXT NOT NULL,
    "bullmq_job_id" TEXT,
    "step" TEXT,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usage_ledger" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT,
    "kind" "LedgerKind" NOT NULL,
    "quota_units" INTEGER NOT NULL DEFAULT 0,
    "provider_units" DOUBLE PRECISION,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usage_ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_flags" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "renders_enabled" BOOLEAN NOT NULL DEFAULT true,
    "dewatermark_enabled" BOOLEAN NOT NULL DEFAULT true,
    "scrape_enabled" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_flags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_hash_key" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_id_idx" ON "refresh_tokens"("family_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_hash_key" ON "email_verification_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "email_verification_tokens_user_id_idx" ON "email_verification_tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_hash_key" ON "password_reset_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "password_reset_tokens_user_id_idx" ON "password_reset_tokens"("user_id");

-- CreateIndex
CREATE INDEX "projects_user_id_created_at_idx" ON "projects"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
CREATE INDEX "images_project_id_position_idx" ON "images"("project_id", "position");

-- CreateIndex
CREATE INDEX "images_project_id_content_hash_idx" ON "images"("project_id", "content_hash");

-- CreateIndex
CREATE INDEX "consents_user_id_idx" ON "consents"("user_id");

-- CreateIndex
CREATE INDEX "consents_project_id_type_idx" ON "consents"("project_id", "type");

-- CreateIndex
CREATE INDEX "job_events_project_id_created_at_idx" ON "job_events"("project_id", "created_at");

-- CreateIndex
CREATE INDEX "usage_ledger_user_id_created_at_idx" ON "usage_ledger"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "usage_ledger_project_id_idx" ON "usage_ledger"("project_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consents" ADD CONSTRAINT "consents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consents" ADD CONSTRAINT "consents_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_events" ADD CONSTRAINT "job_events_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_ledger" ADD CONSTRAINT "usage_ledger_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_ledger" ADD CONSTRAINT "usage_ledger_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

