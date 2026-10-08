-- Real Higgsfield pricing for Kling 2.5 turbo 5 s clips (POST /estimate: 2.856 credits = $0.179). Only replaces untouched seed values.
UPDATE "app_config" SET "value" = 0.0627, "description" = 'USD cost of one Higgsfield credit (from the API estimate: $0.179 / 2.856 credits, after the 15% API discount).' WHERE "key" = 'higgsfield.usd_per_credit' AND "value" = 0.05;
UPDATE "app_config" SET "value" = 2.856, "description" = 'Credits per 5 s Kling 2.5 turbo clip, used only when the estimate endpoint is unavailable.' WHERE "key" = 'higgsfield.fallback_credits_per_clip' AND "value" = 7.5;
