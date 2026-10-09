-- Volume pricing: bigger credit purchases get more credits per euro (admin-managed tiers).

-- CreateTable
CREATE TABLE "credit_rate_tiers" (
    "id" TEXT NOT NULL,
    "min_eur" INTEGER NOT NULL,
    "credits_per_eur" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_rate_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credit_rate_tiers_min_eur_key" ON "credit_rate_tiers"("min_eur");
