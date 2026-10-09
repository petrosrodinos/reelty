import type { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AnalyticsBucket, AnalyticsPoint } from "@/features/admin/interfaces/analytics.interfaces";
import { cn } from "@/lib/utils";
import { formatCount, formatEur, formatPeriodLong, toEur } from "@/views/admin/analytics/utils/analytics-format.utils";

interface PeriodTableProps {
  series: AnalyticsPoint[];
  bucket: AnalyticsBucket;
}

/** Every charted number per period, newest first: the readable fallback for the charts. */
export const PeriodTable: FC<PeriodTableProps> = ({ series, bucket }) => {
  const rows = [...series].reverse();
  return (
    <section aria-labelledby="periods-heading" className="rounded-lg border border-hairline bg-canvas p-5">
      <h2 id="periods-heading" className="font-medium text-ink">
        By period
      </h2>
      <div className="mt-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Refunds</TableHead>
              <TableHead className="text-right">Stripe</TableHead>
              <TableHead className="text-right">Higgsfield</TableHead>
              <TableHead className="text-right">Apify</TableHead>
              <TableHead className="text-right">Watermark</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">New users</TableHead>
              <TableHead className="text-right">Videos</TableHead>
              <TableHead className="text-right">Failed</TableHead>
              <TableHead className="text-right">Avg images</TableHead>
              <TableHead className="text-right">Cost / video</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.period}>
                <TableCell className="whitespace-nowrap">{formatPeriodLong(row.period, bucket)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatEur(toEur(row.revenue_eur_cents))}</TableCell>
                <TableCell className="text-right tabular-nums">{formatEur(toEur(row.refunds_eur_cents))}</TableCell>
                <TableCell className="text-right tabular-nums">{formatEur(toEur(row.stripe_fee_eur_cents))}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatEur(toEur(row.higgsfield_cost_eur_cents))}
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatEur(toEur(row.apify_cost_eur_cents))}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatEur(toEur(row.dewatermark_cost_eur_cents))}
                </TableCell>
                <TableCell
                  className={cn("text-right font-medium tabular-nums", row.profit_eur_cents < 0 && "text-destructive")}
                >
                  {formatEur(toEur(row.profit_eur_cents))}
                </TableCell>
                <TableCell className="text-right tabular-nums">{formatCount(row.new_users)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCount(row.videos_completed)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCount(row.videos_failed)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCount(row.avg_images_per_video, 1)}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatEur(toEur(row.avg_cost_per_video_eur_cents))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
