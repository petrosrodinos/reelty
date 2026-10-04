import { z } from 'zod';

export const DownloadUrlQuerySchema = z.object({
  version: z.enum(['original', 'processed']).optional().default('original'),
});

export type DownloadUrlQueryType = z.infer<typeof DownloadUrlQuerySchema>;
