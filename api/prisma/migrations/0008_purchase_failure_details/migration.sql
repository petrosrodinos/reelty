-- Why a payment attempt failed (from Stripe's payment_intent.payment_failed), shown to the buyer and admins.
ALTER TABLE "credit_purchases" ADD COLUMN "failure_code" TEXT,
ADD COLUMN "failure_decline" TEXT,
ADD COLUMN "failure_message" TEXT,
ADD COLUMN "failed_at" TIMESTAMP(3);
