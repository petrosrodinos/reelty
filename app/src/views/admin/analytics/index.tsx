"use client";

import { useState, type FC, type ReactNode } from "react";
import { WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { AnalyticsRangeFormOptions } from "@/config/constants/dropdowns/admin/analytics-range-form.options";
import { useAnalytics } from "@/features/admin/hooks/use-admin";
import type { Analytics, AnalyticsRange } from "@/features/admin/interfaces/analytics.interfaces";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { KpiTile } from "@/views/admin/analytics/components/kpi-tile";
import { PeriodTable } from "@/views/admin/analytics/components/period-table";
import { TimeSeriesChart, type ChartRow } from "@/views/admin/analytics/components/time-series-chart";
import { formatCount, formatEur, formatEurCompact, toEur } from "@/views/admin/analytics/utils/analytics-format.utils";
import { formatPercent, pluralize } from "@/lib/format.utils";

const rangeItems = AnalyticsRangeFormOptions.map((option) => ({ value: option.id, label: option.label }));

const Section: FC<{ id: string; title: string; description?: string; children: ReactNode }> = ({
  id,
  title,
  description,
  children,
}) => (
  <section aria-labelledby={id} className="mt-10 first:mt-0">
    <h2 id={id} className="text-lg font-medium text-ink">
      {title}
    </h2>
    {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
    <div className="mt-4 flex flex-col gap-4">{children}</div>
  </section>
);

const AnalyticsSkeleton: FC = () => (
  <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading analytics">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-24 rounded-lg" />
      ))}
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <Skeleton className="h-80 rounded-lg" />
      <Skeleton className="h-80 rounded-lg" />
    </div>
  </div>
);

/** Share of revenue, e.g. "12% of revenue"; nothing without revenue. */
const ofRevenue = (cents: number, revenue: number) =>
  revenue > 0 ? `${formatPercent((cents / revenue) * 100)} of revenue` : undefined;

const AnalyticsBody: FC<{ data: Analytics }> = ({ data }) => {
  const { totals: t, bucket } = data;
  const eurAxis = (value: number) => formatEurCompact(value);

  const money: ChartRow[] = data.series.map((p) => ({
    period: p.period,
    revenue: toEur(p.revenue_eur_cents),
    profit: toEur(p.profit_eur_cents),
  }));
  const costs: ChartRow[] = data.series.map((p) => ({
    period: p.period,
    stripe: toEur(p.stripe_fee_eur_cents),
    higgsfield: toEur(p.higgsfield_cost_eur_cents),
    apify: toEur(p.apify_cost_eur_cents),
    dewatermark: toEur(p.dewatermark_cost_eur_cents),
  }));
  const users: ChartRow[] = data.series.map((p) => ({ period: p.period, users: p.new_users }));
  const videos: ChartRow[] = data.series.map((p) => ({
    period: p.period,
    completed: p.videos_completed,
    failed: p.videos_failed,
  }));
  const costPerVideo: ChartRow[] = data.series.map((p) => ({
    period: p.period,
    cost: toEur(p.avg_cost_per_video_eur_cents),
  }));
  const imagesPerVideo: ChartRow[] = data.series.map((p) => ({ period: p.period, images: p.avg_images_per_video }));

  return (
    <>
      <Section
        id="money-heading"
        title="Money"
        description="Revenue is what customers paid for credits. Stripe fees are the real fees Stripe reported on each payment."
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KpiTile
            emphasis
            label="Revenue"
            value={formatEur(toEur(t.revenue_eur_cents))}
            hint={pluralize(t.purchases, "purchase")}
          />
          <KpiTile
            emphasis
            label="Total fees and costs"
            value={formatEur(toEur(t.total_cost_eur_cents))}
            hint={ofRevenue(t.total_cost_eur_cents, t.revenue_eur_cents)}
          />
          <KpiTile
            emphasis
            label="Profit"
            value={formatEur(toEur(t.profit_eur_cents))}
            tone={t.profit_eur_cents < 0 ? "negative" : "default"}
            hint={t.margin_pct === null ? "No revenue yet" : `${formatPercent(t.margin_pct)} margin`}
          />
          <KpiTile
            emphasis
            label="Net revenue"
            value={formatEur(toEur(t.net_revenue_eur_cents))}
            hint="After refunds and Stripe fees"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <KpiTile
            label="Stripe fees"
            value={formatEur(toEur(t.stripe_fee_eur_cents))}
            hint={ofRevenue(t.stripe_fee_eur_cents, t.revenue_eur_cents)}
          />
          <KpiTile
            label="Higgsfield (video clips)"
            value={formatEur(toEur(t.higgsfield_cost_eur_cents))}
            hint={ofRevenue(t.higgsfield_cost_eur_cents, t.revenue_eur_cents)}
          />
          <KpiTile
            label="Apify (listing imports)"
            value={formatEur(toEur(t.apify_cost_eur_cents))}
            hint={ofRevenue(t.apify_cost_eur_cents, t.revenue_eur_cents)}
          />
          <KpiTile
            label="Watermark removal"
            value={formatEur(toEur(t.dewatermark_cost_eur_cents))}
            hint={ofRevenue(t.dewatermark_cost_eur_cents, t.revenue_eur_cents)}
          />
          <KpiTile
            label="Refunds"
            value={formatEur(toEur(t.refunds_eur_cents))}
            hint={ofRevenue(t.refunds_eur_cents, t.revenue_eur_cents)}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <TimeSeriesChart
            title="Revenue and profit"
            description="Profit = revenue - refunds - Stripe fees - provider costs"
            kind="line"
            data={money}
            series={[
              { key: "revenue", label: "Revenue" },
              { key: "profit", label: "Profit" },
            ]}
            bucket={bucket}
            formatValue={formatEur}
            formatAxis={eurAxis}
          />
          <TimeSeriesChart
            title="Fees and costs by type"
            kind="stacked-bar"
            data={costs}
            series={[
              { key: "stripe", label: "Stripe fees" },
              { key: "higgsfield", label: "Higgsfield" },
              { key: "apify", label: "Apify" },
              { key: "dewatermark", label: "Watermark removal" },
            ]}
            bucket={bucket}
            formatValue={formatEur}
            formatAxis={eurAxis}
          />
        </div>
      </Section>

      <Section id="users-heading" title="Users">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <KpiTile label="Total users" value={formatCount(t.users_total)} hint="All time" />
          <KpiTile label="New users" value={formatCount(t.users_new)} />
          <KpiTile label="Paying users" value={formatCount(t.paying_users)} hint="Bought credits in this period" />
          <KpiTile label="Revenue per paying user" value={formatEur(toEur(t.arppu_eur_cents))} />
          <KpiTile label="Average purchase" value={formatEur(toEur(t.avg_purchase_eur_cents))} />
        </div>
        <TimeSeriesChart
          title="New users"
          kind="bar"
          data={users}
          series={[{ key: "users", label: "New users" }]}
          bucket={bucket}
          formatValue={(value) => formatCount(value)}
          integer
        />
      </Section>

      <Section
        id="videos-heading"
        title="Videos"
        description="Cost per video spreads all provider costs (including failed renders and imports) over the videos delivered."
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <KpiTile
            label="Videos delivered"
            value={formatCount(t.videos_completed)}
            hint={`${formatCount(t.videos_submitted)} submitted`}
          />
          <KpiTile
            label="Failed"
            value={formatCount(t.videos_failed)}
            hint={t.success_rate_pct === null ? undefined : `${formatPercent(t.success_rate_pct)} success rate`}
          />
          <KpiTile label="Average images per video" value={formatCount(t.avg_images_per_video, 1)} />
          <KpiTile label="Average cost per video" value={formatEur(toEur(t.avg_cost_per_video_eur_cents))} />
          <KpiTile label="Average credits per video" value={formatCount(t.avg_credits_per_video, 1)} />
        </div>
        <TimeSeriesChart
          title="Videos delivered and failed"
          kind="stacked-bar"
          data={videos}
          series={[
            { key: "completed", label: "Delivered" },
            { key: "failed", label: "Failed" },
          ]}
          bucket={bucket}
          formatValue={(value) => formatCount(value)}
          integer
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <TimeSeriesChart
            title="Average cost per video"
            kind="line"
            data={costPerVideo}
            series={[{ key: "cost", label: "Cost per video" }]}
            bucket={bucket}
            formatValue={formatEur}
            formatAxis={eurAxis}
          />
          <TimeSeriesChart
            title="Average images per video"
            kind="line"
            data={imagesPerVideo}
            series={[{ key: "images", label: "Images per video" }]}
            bucket={bucket}
            formatValue={(value) => formatCount(value, 1)}
          />
        </div>
      </Section>

      <Section id="credits-heading" title="Credits">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KpiTile label="Bought" value={formatCount(t.credits_purchased)} />
          <KpiTile
            label="Spent on videos"
            value={formatCount(t.credits_spent)}
            hint="Net of refunds for failed videos"
          />
          <KpiTile label="Given free" value={formatCount(t.credits_granted)} hint="Signup grants and admin additions" />
          <KpiTile label="Unspent balance" value={formatCount(t.credits_outstanding)} hint="All users, right now" />
        </div>
      </Section>

      <div className="mt-10">
        <PeriodTable series={data.series} bucket={bucket} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Provider costs are recorded in USD and shown in EUR at ${data.usd_per_eur} per €1.
        {t.estimated_cost_pct
          ? ` ${formatPercent(t.estimated_cost_pct)} of them are estimates from the configured prices.`
          : ""}{" "}
        Periods are in UTC.
      </p>
    </>
  );
};

const AdminAnalyticsContent: FC = () => {
  const [range, setRange] = useState<AnalyticsRange>("30d");
  const { data, isPending, error, refetch, isFetching } = useAnalytics(range);

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Analytics</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Revenue, fees, provider costs and profit, with user and video activity.
        </p>
      </div>

      <AdminTabs />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select value={range} onValueChange={(value) => setRange(value as AnalyticsRange)} items={rangeItems}>
          <SelectTrigger aria-label="Time range" className="h-11 w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AnalyticsRangeFormOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isFetching && !isPending ? <span className="text-sm text-muted-foreground">Updating…</span> : null}
      </div>

      {isPending ? (
        <AnalyticsSkeleton />
      ) : error ? (
        <StatePanel
          icon={<WifiOffIcon className="size-6" />}
          title="We could not load the analytics"
          description={error.message}
        >
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : (
        <AnalyticsBody data={data} />
      )}
    </div>
  );
};

const AdminAnalyticsPage: FC = () => (
  <AdminGuard>
    <AdminAnalyticsContent />
  </AdminGuard>
);

export default AdminAnalyticsPage;
