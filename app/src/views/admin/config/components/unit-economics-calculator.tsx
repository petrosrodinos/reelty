"use client";

import { useState, type FC } from "react";
import { CheckCircle2Icon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AppConfigItem } from "@/features/admin/interfaces/admin.interfaces";
import {
  packEconomics,
  ratesFromConfig,
  tierEconomics,
  wholeEuroRates,
} from "@/features/admin/utils/unit-economics.utils";
import type { CreditTier } from "@/features/credits/interfaces/credits.interfaces";
import { PURCHASE_MAX_VIDEOS, PURCHASE_VIDEO_STEP } from "@/features/credits/utils/credit-pricing.utils";
import { formatEurCents, formatPercent, pluralize } from "@/lib/format.utils";
import { cn } from "@/lib/utils";

export const CREDITS_PER_EUR_KEY = "billing.credits_per_eur";
const MAX_CREDITS_KEY = "billing.max_credits_per_purchase";

interface UnitEconomicsCalculatorProps {
  items: AppConfigItem[];
  tiers: CreditTier[];
  /** Average fee % Stripe actually charged on past purchases; null when none were paid yet. */
  stripeFeePct: number | null;
  /** Paid purchases the average comes from. */
  feeSamples: number;
  isSaving: boolean;
  onSaveCreditsPerEur: (value: number) => void;
}

const Stat: FC<{
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "negative";
}> = ({ label, value, hint, tone = "default" }) => (
  <div className="rounded-md border border-hairline-soft p-4">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={cn("mt-1 text-xl font-semibold tabular-nums", tone === "negative" && "text-destructive")}>{value}</p>
    {hint ? <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">{hint}</p> : null}
  </div>
);

/**
 * What-if calculator for credit pricing: price and Stripe fee of a purchase pack, then margin per video for
 * every tier. Uses the saved prices below; only credits-per-€ can be tried out here before saving.
 * Remounted (via key) when credits-per-€ is saved so the draft starts from the stored value.
 */
export const UnitEconomicsCalculator: FC<UnitEconomicsCalculatorProps> = ({
  items,
  tiers,
  stripeFeePct,
  feeSamples,
  isSaving,
  onSaveCreditsPerEur,
}) => {
  const saved = ratesFromConfig(items);
  const maxCredits = items.find((item) => item.key === MAX_CREDITS_KEY)?.value ?? 0;

  const [rateDraft, setRateDraft] = useState(String(saved.creditsPerEur));
  const [videos, setVideos] = useState(PURCHASE_VIDEO_STEP);
  const [watermarkRemoval, setWatermarkRemoval] = useState(false);
  const [imported, setImported] = useState(false);

  const parsedRate = Number(rateDraft);
  const rateValid = /^\d+$/.test(rateDraft.trim()) && parsedRate >= 1;
  const rates = {
    ...saved,
    creditsPerEur: rateValid ? parsedRate : saved.creditsPerEur,
  };
  const rateDirty = rateValid && parsedRate !== saved.creditsPerEur;

  // Mirrors the purchase slider (BuyCreditsCard): packs of videos priced at the default tier.
  const defaultTier = tiers.find((tier) => tier.is_default) ?? tiers[0];
  const perVideo = Math.max(defaultTier?.credits ?? 1, 1);
  const maxByCredits = Math.floor(maxCredits / perVideo / PURCHASE_VIDEO_STEP) * PURCHASE_VIDEO_STEP;
  const maxVideos = Math.max(PURCHASE_VIDEO_STEP, Math.min(PURCHASE_MAX_VIDEOS, maxByCredits));
  const packVideos = Math.min(videos, maxVideos);

  const pack = packEconomics(packVideos * perVideo, rates, stripeFeePct);
  const smallestPack = packEconomics(PURCHASE_VIDEO_STEP * perVideo, rates, stripeFeePct);
  const wholeRates = wholeEuroRates(PURCHASE_VIDEO_STEP, perVideo);
  const rows = tiers.map((tier) => tierEconomics(tier, pack.netCentsPerCredit, { watermarkRemoval, imported }, rates));

  return (
    <section
      aria-labelledby="economics-heading"
      className="mb-8 rounded-lg border border-hairline bg-canvas p-5 sm:p-6"
    >
      <h2 id="economics-heading" className="text-lg font-medium text-ink">
        Unit economics
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        What a credit purchase brings in after Stripe, and what each video size earns once provider costs are paid.
        The Stripe fee is the real average Stripe charged on past purchases; costs use the prices below, taken at the
        most photos a tier allows.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,14rem)]">
        <div>
          <Label htmlFor="economics-rate" className="text-sm font-medium text-ink">
            Credits per €1
          </Label>
          <div className="relative mt-2">
            <Input
              id="economics-rate"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={rateDraft}
              onChange={(event) => setRateDraft(event.target.value)}
              aria-invalid={!rateValid}
              aria-describedby="economics-rate-hint"
              className="h-11 pr-16 tabular-nums"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">
              credits
            </span>
          </div>
          <p
            id="economics-rate-hint"
            className={cn("mt-1.5 text-xs tabular-nums", rateValid ? "text-muted-foreground" : "text-destructive")}
          >
            {rateValid ? `1 credit = ${formatEurCents(100 / rates.creditsPerEur)}` : "Whole number, 1 or more"}
          </p>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm font-medium text-ink">Purchase pack</p>
            <p className="text-sm text-muted-foreground tabular-nums">
              {pluralize(packVideos, "video")} · {pluralize(pack.credits, "credit")}
            </p>
          </div>
          <Slider
            className="mt-5"
            min={PURCHASE_VIDEO_STEP}
            max={maxVideos}
            step={PURCHASE_VIDEO_STEP}
            value={[packVideos]}
            onValueChange={(value) => setVideos(Array.isArray(value) ? value[0] : value)}
            aria-label="Videos in the purchase pack"
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{PURCHASE_VIDEO_STEP}</span>
            <span>{maxVideos}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink">Add-ons on every video</p>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="economics-watermark" className="text-sm font-normal text-muted-foreground">
              Watermark removal
            </Label>
            <Switch id="economics-watermark" checked={watermarkRemoval} onCheckedChange={setWatermarkRemoval} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="economics-import" className="text-sm font-normal text-muted-foreground">
              Imported from a link
            </Label>
            <Switch id="economics-import" checked={imported} onCheckedChange={setImported} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Customer pays" value={formatEurCents(pack.amountCents)} hint={pluralize(pack.credits, "credit")} />
        <Stat
          label="Stripe fee"
          value={stripeFeePct === null ? "–" : formatEurCents(pack.feeCents)}
          hint={
            stripeFeePct === null
              ? "No paid purchases yet"
              : `${formatPercent(stripeFeePct)} avg of ${pluralize(feeSamples, "purchase")}`
          }
        />
        <Stat label="We keep" value={formatEurCents(pack.netCents)} tone={pack.netCents < 0 ? "negative" : "default"} />
        <Stat
          label="Net per credit"
          value={formatEurCents(pack.netCentsPerCredit)}
          hint={`list ${formatEurCents(100 / rates.creditsPerEur)}`}
        />
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm">
        {smallestPack.wholeEuros ? (
          <>
            <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <p className="text-muted-foreground">
              Every pack of {PURCHASE_VIDEO_STEP} videos ({pluralize(smallestPack.credits, "credit")}) costs a whole
              number of euros.
            </p>
          </>
        ) : (
          <>
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
            <p className="text-muted-foreground">
              A pack of {PURCHASE_VIDEO_STEP} videos is {pluralize(smallestPack.credits, "credit")}, which is{" "}
              {formatEurCents((smallestPack.credits / rates.creditsPerEur) * 100)}
              {smallestPack.exactCents ? "" : " after rounding to the cent"}, not a whole euro amount. Whole-euro packs
              at {wholeRates.join(", ")} credits per €1.
            </p>
          </>
        )}
      </div>

      {rows.length ? (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Video</TableHead>
              <TableHead className="text-right">Credits</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Provider cost</TableHead>
              <TableHead className="text-right">Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const negative = row.marginCents < 0;
              return (
                <TableRow key={row.tier.id}>
                  <TableCell>
                    <span className="font-medium">{row.tier.name}</span>
                    <span className="block text-xs text-muted-foreground tabular-nums">
                      cost at {pluralize(row.clips, "photo")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{row.credits}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatEurCents(row.revenueCents)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatEurCents(row.costCents)}</TableCell>
                  <TableCell className={cn("text-right tabular-nums", negative && "text-destructive")}>
                    {formatEurCents(row.marginCents)}
                    <span className={cn("block text-xs", negative ? "text-destructive" : "text-muted-foreground")}>
                      {formatPercent(row.marginPct)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">Add credit tiers to see the margin per video.</p>
      )}

      {rateDirty ? (
        <div className="mt-6 flex flex-col gap-3 border-t border-hairline-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            You are trying {pluralize(parsedRate, "credit")} per €1; the saved rate is {saved.creditsPerEur}.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setRateDraft(String(saved.creditsPerEur))} disabled={isSaving}>
              Reset
            </Button>
            <Button onClick={() => onSaveCreditsPerEur(parsedRate)} disabled={isSaving}>
              {isSaving ? "Saving" : `Save ${parsedRate} per €1`}
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
};
