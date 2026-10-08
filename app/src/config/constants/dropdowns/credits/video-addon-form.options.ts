import { VideoAddonKeys, type VideoAddonKey } from "@/features/credits/interfaces/credits.interfaces";

/** Labels for the flat per-video add-ons. */
export const VideoAddonFormOptions: { id: VideoAddonKey; label: string }[] = [
  { id: VideoAddonKeys.WATERMARK_REMOVAL, label: "Watermark removal" },
  { id: VideoAddonKeys.IMPORT_FETCH, label: "Airbnb / website import" },
];
