-- Credits replace the monthly video quota: users hold a credit balance, buy credits through Stripe,
-- and each video costs credits by clip-count tier plus flat add-ons (all admin-configurable).

-- CreateEnum
CREATE TYPE "CreditTxKind" AS ENUM ('signup_grant', 'purchase', 'video_charge', 'video_refund', 'purchase_refund', 'admin_adjustment');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('pending', 'paid', 'failed', 'expired', 'refunded', 'partially_refunded');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "credit_balance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "stripe_customer_id" TEXT;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN "credits_charged" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "credit_tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "min_clips" INTEGER NOT NULL,
    "max_clips" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "kind" "CreditTxKind" NOT NULL,
    "credits" INTEGER NOT NULL,
    "balance_after" INTEGER NOT NULL,
    "project_id" TEXT,
    "purchase_id" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_purchases" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'pending',
    "credits" INTEGER NOT NULL,
    "videos_selected" INTEGER,
    "credits_per_eur" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "amount_eur_cents" INTEGER NOT NULL,
    "stripe_fee_eur_cents" INTEGER,
    "net_eur_cents" INTEGER,
    "stripe_fee_pct" DOUBLE PRECISION,
    "usd_per_eur" DOUBLE PRECISION,
    "amount_usd_cents" INTEGER,
    "stripe_fee_usd_cents" INTEGER,
    "net_usd_cents" INTEGER,
    "refunded_eur_cents" INTEGER NOT NULL DEFAULT 0,
    "refunded_credits" INTEGER NOT NULL DEFAULT 0,
    "stripe_checkout_session_id" TEXT,
    "stripe_payment_intent_id" TEXT,
    "stripe_charge_id" TEXT,
    "stripe_balance_transaction_id" TEXT,
    "payment_method_type" TEXT,
    "card_brand" TEXT,
    "card_country" TEXT,
    "receipt_url" TEXT,
    "paid_at" TIMESTAMP(3),
    "refunded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE INDEX "credit_transactions_user_id_created_at_idx" ON "credit_transactions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "credit_transactions_project_id_idx" ON "credit_transactions"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "credit_purchases_stripe_checkout_session_id_key" ON "credit_purchases"("stripe_checkout_session_id");

-- CreateIndex
CREATE INDEX "credit_purchases_user_id_created_at_idx" ON "credit_purchases"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "credit_purchases_status_created_at_idx" ON "credit_purchases"("status", "created_at");

-- CreateIndex
CREATE INDEX "credit_purchases_stripe_charge_id_idx" ON "credit_purchases"("stripe_charge_id");

-- AddForeignKey
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "credit_purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_purchases" ADD CONSTRAINT "credit_purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed default tiers (cover the 3..12 clip range; Standard is the slider reference).
INSERT INTO "credit_tiers" ("id", "name", "min_clips", "max_clips", "credits", "is_default", "updated_at") VALUES
  (gen_random_uuid()::text, 'Short', 3, 6, 3, false, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Standard', 7, 9, 5, true, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Long', 10, 12, 8, false, CURRENT_TIMESTAMP);

-- Seed credit/billing settings (keys in modules/app-config/app-config.constants.ts).
INSERT INTO "app_config" ("key", "value", "unit", "description", "updated_at") VALUES
  ('billing.credits_per_eur', 1, 'credits', 'Credits a user gets for 1 EUR. Price of a purchase = credits / this value.', CURRENT_TIMESTAMP),
  ('billing.usd_per_eur', 1.08, 'ratio', 'USD per 1 EUR, snapshotted onto each purchase for the USD columns.', CURRENT_TIMESTAMP),
  ('billing.max_credits_per_purchase', 500, 'credits', 'Largest number of credits one checkout may buy.', CURRENT_TIMESTAMP),
  ('credits.signup_grant', 3, 'credits', 'Free credits given once to every new account.', CURRENT_TIMESTAMP),
  ('credits.watermark_removal', 1, 'credits', 'Flat add-on per video when at least one photo had its watermark removed.', CURRENT_TIMESTAMP),
  ('credits.import_fetch', 0, 'credits', 'Flat add-on per video imported from an Airbnb or website link.', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;

-- Existing users get the one-time signup grant.
UPDATE "users" SET "credit_balance" = 3;
INSERT INTO "credit_transactions" ("id", "user_id", "kind", "credits", "balance_after", "note")
SELECT gen_random_uuid()::text, "id", 'signup_grant', 3, 3, 'credits launch grant' FROM "users";

-- Renders charged under the old quota keep credits_charged = 0, so a later refund gives back nothing extra.

-- AlterTable
ALTER TABLE "users" DROP COLUMN "monthly_video_quota";
