// GCS object layout — spec §7.1. One private bucket, never public.
export const StoragePaths = {
  projectPrefix: (userId: string, projectId: string) => `users/${userId}/projects/${projectId}/`,
  userPrefix: (userId: string) => `users/${userId}/`,
  imageOriginal: (userId: string, projectId: string, imageId: string, ext: string) =>
    `users/${userId}/projects/${projectId}/images/${imageId}/original.${ext}`,
  imageProcessed: (userId: string, projectId: string, imageId: string) =>
    `users/${userId}/projects/${projectId}/images/${imageId}/processed.jpg`,
  imageThumb: (userId: string, projectId: string, imageId: string) =>
    `users/${userId}/projects/${projectId}/images/${imageId}/thumb.jpg`,
  videoFinal: (userId: string, projectId: string) => `users/${userId}/projects/${projectId}/video/final.mp4`,
  videoPoster: (userId: string, projectId: string) => `users/${userId}/projects/${projectId}/video/poster.jpg`,
  workClip: (userId: string, projectId: string, imageId: string) =>
    `users/${userId}/projects/${projectId}/work/clips/${imageId}.mp4`,
  workPrefix: (userId: string, projectId: string) => `users/${userId}/projects/${projectId}/work/`,
  soundtrack: () => `assets/soundtrack/track.mp3`,
  soundtrackLicense: () => `assets/soundtrack/LICENSE.txt`,
} as const;
