import { WatermarkStatuses, type WatermarkStatus } from "@/features/images/interfaces/images.interfaces";

export const WatermarkStatusFormOptions: { id: WatermarkStatus; label: string }[] = [
  { id: WatermarkStatuses.NONE, label: "Original" },
  { id: WatermarkStatuses.PROCESSING, label: "Removing watermark" },
  { id: WatermarkStatuses.DONE, label: "Cleaned" },
  { id: WatermarkStatuses.FAILED, label: "Failed" },
];
