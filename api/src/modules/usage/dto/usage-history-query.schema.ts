import { z } from 'zod';
import { LedgerKind } from 'generated/prisma';

const page = z
  .string()
  .optional()
  .transform((v) => (v ? parseInt(v, 10) : 1))
  .pipe(z.number().int().min(1));

const limit = z
  .string()
  .optional()
  .transform((v) => (v ? parseInt(v, 10) : 20))
  .pipe(z.number().int().min(1).max(100));

/** Operator history across all users, including provider costs. */
export const AdminUsageQuerySchema = z.object({
  page,
  limit,
  kind: z.nativeEnum(LedgerKind).optional(),
  user_id: z.string().uuid().optional(),
  project_id: z.string().uuid().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});
export type AdminUsageQueryType = z.infer<typeof AdminUsageQuerySchema>;
