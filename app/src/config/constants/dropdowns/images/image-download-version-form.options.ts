import { ImageDownloadVersions, type ImageDownloadVersion } from "@/features/images/interfaces/images.interfaces";

export const ImageDownloadVersionFormOptions: { id: ImageDownloadVersion; label: string }[] = [
  { id: ImageDownloadVersions.ORIGINAL, label: "Original" },
  { id: ImageDownloadVersions.PROCESSED, label: "Cleaned" },
];
