-- AlterTable
ALTER TABLE "usage_ledger" ADD COLUMN "credits" DOUBLE PRECISION,
ADD COLUMN "cost_usd" DOUBLE PRECISION,
ADD COLUMN "cost_estimated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "app_config" (
    "key" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_config_pkey" PRIMARY KEY ("key")
);

-- Seed prices. higgsfield.usd_per_credit is a PLACEHOLDER: set it from your actual plan price.
INSERT INTO "app_config" ("key", "value", "unit", "description", "updated_at") VALUES
  ('higgsfield.usd_per_credit', 0.05, 'usd', 'PLACEHOLDER: USD cost of one Higgsfield credit. Set from your plan price (plan price / credits in plan).', CURRENT_TIMESTAMP),
  ('higgsfield.fallback_credits_per_clip', 7.5, 'credits', 'Credits per 5 s clip, used only when the cost preflight answers in an unexpected shape.', CURRENT_TIMESTAMP),
  ('dewatermark.credits_per_image', 1, 'credits', 'Dewatermark credits charged per image.', CURRENT_TIMESTAMP),
  ('dewatermark.usd_per_credit', 0.1, 'usd', 'USD cost of one dewatermark credit. Set from your plan price.', CURRENT_TIMESTAMP),
  ('apify.fallback_usd_per_run', 0.005, 'usd', 'USD cost of one listing scrape, used only when Apify does not report the run usage.', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;
