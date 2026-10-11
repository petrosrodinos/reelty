import { z } from 'zod';
import { limitParam, pageParam } from '@/modules/credits/dto/credit-transactions-query.schema';

/** job_events statuses that mean something went wrong ("warning" = a single clip or soundtrack problem). */
export const ERROR_EVENT_STATUSES = ['failed', 'error', 'warning'] as const;

export const AdminErrorsQuerySchema = z.object({
  page: pageParam,
  limit: limitParam,
  status: z.enum(ERROR_EVENT_STATUSES).optional(),
  job_name: z.string().min(1).max(64).optional(),
  project_id: z.string().uuid().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});
export type AdminErrorsQueryType = z.infer<typeof AdminErrorsQuerySchema>;
