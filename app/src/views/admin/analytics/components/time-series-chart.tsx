"use client";

import type { FC } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AnalyticsBucket } from "@/features/admin/interfaces/analytics.interfaces";
import { formatPeriodLong, formatPeriodTick, SeriesColors } from "@/views/admin/analytics/utils/analytics-format.utils";

export interface ChartSeries {
  key: string;
  label: string;
}

export type ChartRow = { period: string } & Record<string, number | string | null>;

interface TimeSeriesChartProps {
  title: string;
  description?: string;
  kind: "line" | "stacked-bar" | "bar";
  data: ChartRow[];
  /** In draw order; each takes the next categorical slot. Max 4. */
  series: ChartSeries[];
  bucket: AnalyticsBucket;
  formatValue: (value: number) => string;
  formatAxis?: (value: number) => string;
  /** Counts: whole-number axis ticks only. */
  integer?: boolean;
}

/**
 * One measure over time on a single axis. Several series share the unit (never a second y-axis); a legend
 * names them and the tooltip lists every value for the hovered period.
 */
export const TimeSeriesChart: FC<TimeSeriesChartProps> = ({
  title,
  description,
  kind,
  data,
  series,
  bucket,
  formatValue,
  formatAxis = formatValue,
  integer = false,
}) => {
  const config: ChartConfig = Object.fromEntries(
    series.map((s, index) => [s.key, { label: s.label, theme: SeriesColors[index] }]),
  );
  const hasNegative = data.some((row) =>
    series.some((s) => typeof row[s.key] === "number" && (row[s.key] as number) < 0),
  );

  const grid = <CartesianGrid vertical={false} strokeDasharray="0" />;
  const xAxis = (
    <XAxis
      dataKey="period"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      minTickGap={24}
      tickFormatter={(value: string) => formatPeriodTick(value, bucket)}
    />
  );
  const yAxis = (
    <YAxis
      tickLine={false}
      axisLine={false}
      width={56}
      allowDecimals={!integer}
      tickMargin={4}
      tickFormatter={(value: number) => formatAxis(value)}
    />
  );
  const tooltip = (
    <ChartTooltip
      cursor={kind === "line" ? true : { fillOpacity: 0.5 }}
      content={
        <ChartTooltipContent
          labelFormatter={(_, payload) => {
            const period = payload?.[0]?.payload?.period;
            return typeof period === "string" ? formatPeriodLong(period, bucket) : "";
          }}
          formatter={(value, name, item) => (
            <div className="flex w-full items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{config[String(name)]?.label ?? name}</span>
              <span className="ml-auto pl-3 font-medium text-foreground tabular-nums">
                {typeof value === "number" ? formatValue(value) : "–"}
              </span>
            </div>
          )}
        />
      }
    />
  );
  // itemSorter={null} keeps the legend in series order (Recharts sorts by key by default).
  const legend = series.length > 1 ? <ChartLegend itemSorter={null} content={<ChartLegendContent />} /> : null;
  const zeroLine = hasNegative ? (
    <ReferenceLine y={0} stroke="var(--color-muted-foreground)" strokeOpacity={0.6} />
  ) : null;

  return (
    <figure className="rounded-lg border border-hairline bg-canvas p-5">
      <figcaption>
        <p className="font-medium text-ink">{title}</p>
        {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
      </figcaption>
      <ChartContainer config={config} className="mt-4 aspect-auto h-64 w-full">
        {kind === "line" ? (
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} accessibilityLayer>
            {grid}
            {xAxis}
            {yAxis}
            {zeroLine}
            {tooltip}
            {legend}
            {series.map((s) => (
              <Line
                key={s.key}
                dataKey={s.key}
                name={s.key}
                type="linear"
                stroke={`var(--color-${s.key})`}
                strokeWidth={2}
                // Gaps are bridged (connectNulls), so only a series with a single value has no line to show.
                dot={
                  data.filter((row) => typeof row[s.key] === "number").length <= 1
                    ? { r: 4, fill: `var(--color-${s.key})`, strokeWidth: 0 }
                    : false
                }
                activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--background)" }}
                connectNulls
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} accessibilityLayer>
            {grid}
            {xAxis}
            {yAxis}
            {zeroLine}
            {tooltip}
            {legend}
            {series.map((s, index) => {
              const top = kind === "bar" || index === series.length - 1;
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.key}
                  stackId={kind === "stacked-bar" ? "stack" : undefined}
                  fill={`var(--color-${s.key})`}
                  // A surface-colored outline leaves a 2px gap between stacked segments.
                  stroke="var(--background)"
                  strokeWidth={kind === "stacked-bar" ? 1 : 0}
                  radius={top ? [4, 4, 0, 0] : 0}
                  maxBarSize={40}
                />
              );
            })}
          </BarChart>
        )}
      </ChartContainer>
    </figure>
  );
};
