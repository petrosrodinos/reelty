/** Display labels for app_config keys (the API only returns the raw key). */
export const AppConfigKeyFormOptions: { id: string; label: string }[] = [
  { id: "higgsfield.usd_per_credit", label: "Higgsfield: price per credit" },
  { id: "higgsfield.fallback_credits_per_clip", label: "Higgsfield: fallback credits per clip" },
  { id: "dewatermark.credits_per_image", label: "Watermark removal: credits per image" },
  { id: "dewatermark.usd_per_credit", label: "Watermark removal: price per credit" },
  { id: "apify.fallback_usd_per_run", label: "Listing import: fallback price per run" },
  { id: "billing.credits_per_eur", label: "Billing: credits per €1" },
  { id: "billing.usd_per_eur", label: "Billing: USD per €1 (for USD columns)" },
  { id: "billing.max_credits_per_purchase", label: "Billing: max credits per purchase" },
  { id: "credits.signup_grant", label: "Credits: free credits on signup" },
  { id: "credits.watermark_removal", label: "Credits: watermark removal add-on" },
  { id: "credits.import_fetch", label: "Credits: Airbnb / website import add-on" },
];
