import { z } from 'zod';
import { ProjectStatus } from 'generated/prisma';

export const ProjectQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 20))
    .pipe(z.number().int().min(1).max(50)),
  status: z.nativeEnum(ProjectStatus).optional(),
});

export type ProjectQueryType = z.infer<typeof ProjectQuerySchema>;
