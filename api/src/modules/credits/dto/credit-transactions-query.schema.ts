import { z } from 'zod';
import { CreditTxKind } from 'generated/prisma';

export const pageParam = z
  .string()
  .optional()
  .transform((v) => (v ? parseInt(v, 10) : 1))
  .pipe(z.number().int().min(1));

export const limitParam = z
  .string()
  .optional()
  .transform((v) => (v ? parseInt(v, 10) : 20))
  .pipe(z.number().int().min(1).max(100));

export const CreditTransactionsQuerySchema = z.object({
  page: pageParam,
  limit: limitParam,
  kind: z.nativeEnum(CreditTxKind).optional(),
});
export type CreditTransactionsQueryType = z.infer<
  typeof CreditTransactionsQuerySchema
>;
