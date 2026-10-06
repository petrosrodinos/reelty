/** Display labels for app_config keys (the API only returns the raw key). */
export const AppConfigKeyFormOptions: { id: string; label: string }[] = [
  { id: "higgsfield.usd_per_credit", label: "Higgsfield: price per credit" },
  { id: "higgsfield.fallback_credits_per_clip", label: "Higgsfield: fallback credits per clip" },
  { id: "dewatermark.credits_per_image", label: "Watermark removal: credits per image" },
  { id: "dewatermark.usd_per_credit", label: "Watermark removal: price per credit" },
  { id: "apify.fallback_usd_per_run", label: "Listing import: fallback price per run" },
];
