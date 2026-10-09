import { z } from 'zod';

export const AnalyticsRanges = ['7d', '30d', '90d', '12m', 'all'] as const;
export type AnalyticsRange = (typeof AnalyticsRanges)[number];

/** Business overview window; the bucket size follows from the range. */
export const AnalyticsQuerySchema = z.object({
  range: z.enum(AnalyticsRanges).optional().default('30d'),
});
export type AnalyticsQueryType = z.infer<typeof AnalyticsQuerySchema>;
