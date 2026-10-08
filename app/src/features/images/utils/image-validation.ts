import { VideoLimits } from "@/lib/format.utils";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const ACCEPT_ATTRIBUTE = ACCEPTED_IMAGE_TYPES.join(",");

export interface ImageFileCheck {
  file: File;
  ok: boolean;
  /** Reason the file is rejected, or a warning when ok. */
  message?: string;
  warning?: boolean;
}

function readDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });
}

/** Client-side pre-validation (spec FR-INTAKE-4): type, size, min 640 px (reject), under 1024 px (warn). */
export async function checkImageFile(file: File): Promise<ImageFileCheck> {
  if (!(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return { file, ok: false, message: "Only JPG, PNG or WebP photos are supported." };
  }
  if (file.size > VideoLimits.maxFileBytes) {
    return { file, ok: false, message: "This file is over 20 MB." };
  }
  if (file.size === 0) {
    return { file, ok: false, message: "This file is empty." };
  }
  const dims = await readDimensions(file);
  if (!dims) {
    return { file, ok: false, message: "This image could not be read." };
  }
  const shortest = Math.min(dims.width, dims.height);
  const longest = Math.max(dims.width, dims.height);
  if (shortest < VideoLimits.minShortestSidePx) {
    return {
      file,
      ok: false,
      message: `Too small (${shortest} px on the short side, minimum ${VideoLimits.minShortestSidePx}).`,
    };
  }
  if (longest < VideoLimits.recommendedLongestSidePx) {
    return { file, ok: true, warning: true, message: "Under 1024 px on the long side, it may look soft in the video." };
  }
  return { file, ok: true };
}

export interface UploadBatch {
  valid: File[];
  rejected: { file: File; message: string }[];
  warnings: string[];
}

/** Validates a drop/pick, trims to the free slots (max photos come from the credit tiers) and collects per-file reasons. */
export async function prepareUploadBatch(files: File[], remainingSlots: number, maxImages: number): Promise<UploadBatch> {
  const checks = await Promise.all(files.map(checkImageFile));
  const rejected = checks
    .filter((check) => !check.ok)
    .map((check) => ({ file: check.file, message: check.message ?? "This file is not supported." }));
  let valid = checks.filter((check) => check.ok);
  const slots = Math.max(0, remainingSlots);
  if (valid.length > slots) {
    valid.slice(slots).forEach((check) =>
      rejected.push({ file: check.file, message: `Only ${maxImages} photos fit in one video.` }),
    );
    valid = valid.slice(0, slots);
  }
  const warnings = valid.filter((check) => check.warning).map((check) => `${check.file.name}: ${check.message}`);
  return { valid: valid.map((check) => check.file), rejected, warnings };
}
