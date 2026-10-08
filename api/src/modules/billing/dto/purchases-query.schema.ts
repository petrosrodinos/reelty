import { z } from 'zod';
import { PurchaseStatus } from 'generated/prisma';
import {
  limitParam,
  pageParam,
} from '@/modules/credits/dto/credit-transactions-query.schema';

export const PurchasesQuerySchema = z.object({
  page: pageParam,
  limit: limitParam,
});
export type PurchasesQueryType = z.infer<typeof PurchasesQuerySchema>;

export const AdminPurchasesQuerySchema = z.object({
  page: pageParam,
  limit: limitParam,
  user_id: z.string().uuid().optional(),
  status: z.nativeEnum(PurchaseStatus).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});
export type AdminPurchasesQueryType = z.infer<typeof AdminPurchasesQuerySchema>;
