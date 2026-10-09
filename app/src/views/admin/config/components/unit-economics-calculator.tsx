"use client";

import { useState, type FC } from "react";
import { CheckCircle2Icon, InfoIcon, PlusIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AppConfigItem } from "@/features/admin/interfaces/admin.interfaces";
import type { CreditRateTierInput } from "@/features/admin/services/admin.services";
import {
  packEconomics,
  rateTierProblems,
  ratesFromConfig,
  tierEconomics,
  wholeEuroRates,
} from "@/features/admin/utils/unit-economics.utils";
import type { CreditRateTier, CreditTier } from "@/features/credits/interfaces/credits.interfaces";
import {
  PURCHASE_MAX_VIDEOS,
  PURCHASE_VIDEO_STEP,
  tierMinCredits,
} from "@/features/credits/utils/credit-pricing.utils";
import { formatEurCents, formatPercent, pluralize } from "@/lib/format.utils";
import { cn } from "@/lib/utils";

export const CREDITS_PER_EUR_KEY = "billing.credits_per_eur";
const MAX_CREDITS_KEY = "billing.max_credits_per_purchase";

interface DraftRate {
  key: string;
  min_eur: string;
  credits_per_eur: string;
}

const toDraft = (tier: CreditRateTier): DraftRate => ({
  key: tier.id,
  min_eur: String(tier.min_eur),
  credits_per_eur: String(tier.credits_per_eur),
});

const toInt = (value: string) => (/^\d+$/.test(value.trim()) ? Number(value) : NaN);

export interface PricingChanges {
  creditsPerEur?: number;
  rateTiers?: CreditRateTierInput[];
}

interface UnitEconomicsCalculatorProps {
  items: AppConfigItem[];
  tiers: CreditTier[];
  rateTiers: CreditRateTier[];
  /** Average fee % Stripe actually charged on past purchases; null when none were paid yet. */
  stripeFeePct: number | null;
  /** Paid purchases the average comes from. */
  feeSamples: number;
  isSaving: boolean;
  onSave: (changes: PricingChanges) => void;
}

/**
 * Credit pricing: the base rate (credits per €1) and better rates for bigger purchases, edited as one draft.
 * Every pack the slider offers is priced with the draft, so the effect on what we keep per credit and per video
 * is visible before saving. Remounted (via key) after a save so the drafts restart from stored values.
 */
export const UnitEconomicsCalculator: FC<UnitEconomicsCalculatorProps> = ({
  items,
  tiers,
  rateTiers,
  stripeFeePct,
  feeSamples,
  isSaving,
  onSave,
}) => {
  const saved = ratesFromConfig(items);
  const maxCredits = items.find((item) => item.key === MAX_CREDITS_KEY)?.value ?? 0;

  const [baseDraft, setBaseDraft] = useState(String(saved.creditsPerEur));
  const [rateDraft, setRateDraft] = useState<DraftRate[]>(() => rateTiers.map(toDraft));
  const [selectedVideos, setSelectedVideos] = useState<number | null>(null);
  const [watermarkRemoval, setWatermarkRemoval] = useState(false);
  const [imported, setImported] = useState(false);

  const parsedBase = toInt(baseDraft);
  const baseValid = Number.isFinite(parsedBase) && parsedBase >= 1;
  const rates = { ...saved, creditsPerEur: baseValid ? parsedBase : saved.creditsPerEur };
  const baseDirty = baseValid && parsedBase !== saved.creditsPerEur;

  const parsedTiers = rateDraft.map((row) => ({
    min_eur: toInt(row.min_eur),
    credits_per_eur: toInt(row.credits_per_eur),
  }));
  const tierProblems = rateTierProblems(parsedTiers, rates.creditsPerEur);
  const tiersValid = tierProblems.length === 0;
  const tiersDirty = JSON.stringify(rateDraft) !== JSON.stringify(rateTiers.map(toDraft));
  const activeTiers = tiersValid ? parsedTiers : rateTiers;

  // Mirrors the purchase slider (BuyCreditsCard): packs of videos priced at the default tier.
  const defaultTier = tiers.find((tier) => tier.is_default) ?? tiers[0];
  const perVideo = Math.max(defaultTier?.credits ?? 1, 1);
  const maxByCredits = Math.floor(maxCredits / perVideo / PURCHASE_VIDEO_STEP) * PURCHASE_VIDEO_STEP;
  const maxVideos = Math.max(PURCHASE_VIDEO_STEP, Math.min(PURCHASE_MAX_VIDEOS, maxByCredits));
  const videosFor = (credits: number) =>
    Math.max(PURCHASE_VIDEO_STEP, Math.ceil(credits / perVideo / PURCHASE_VIDEO_STEP) * PURCHASE_VIDEO_STEP);
  const priceOf = (videos: number) => packEconomics(videos * perVideo, rates, stripeFeePct, activeTiers);

  // The packs worth comparing: the smallest, the first one at each better rate, and the largest.
  const packVideos = [
    ...new Set([
      PURCHASE_VIDEO_STEP,
      ...activeTiers.map((tier) => videosFor(tierMinCredits(tier))).filter((v) => v <= maxVideos),
      maxVideos,
    ]),
  ].sort((a, b) => a - b);
  const packs = packVideos.map((videos) => ({ videos, ...priceOf(videos) }));
  const selected = packs.find((pack) => pack.videos === selectedVideos) ?? packs[0];
  const addons = { watermarkRemoval, imported };
  const rows = tiers.map((tier) => tierEconomics(tier, selected.netCentsPerCredit, addons, rates));

  // Stepped rates can make a bigger pack cheaper than the one before it; customers would skip that range.
  const cliffs: { from: number; to: number; fromCents: number; toCents: number }[] = [];
  for (let videos = PURCHASE_VIDEO_STEP; videos + PURCHASE_VIDEO_STEP <= maxVideos; videos += PURCHASE_VIDEO_STEP) {
    const a = priceOf(videos);
    const b = priceOf(videos + PURCHASE_VIDEO_STEP);
    if (b.amountCents < a.amountCents)
      cliffs.push({ from: videos, to: videos + PURCHASE_VIDEO_STEP, fromCents: a.amountCents, toCents: b.amountCents });
  }

  const smallest = packs[0];
  const wholeRates = wholeEuroRates(PURCHASE_VIDEO_STEP, perVideo);

  const updateTier = (key: string, patch: Partial<DraftRate>) =>
    setRateDraft((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  const addTier = () =>
    setRateDraft((current) => {
      const last = [...parsedTiers]
        .filter((t) => Number.isFinite(t.min_eur) && Number.isFinite(t.credits_per_eur))
        .sort((a, b) => a.min_eur - b.min_eur)
        .at(-1);
      const minEur = last ? last.min_eur * 2 : 20;
      const rate = (last?.credits_per_eur ?? rates.creditsPerEur) + 1;
      return [...current, { key: `new-${Date.now()}`, min_eur: String(minEur), credits_per_eur: String(rate) }];
    });

  const canSave = (baseDirty || tiersDirty) && baseValid && tiersValid && !isSaving;
  const save = () =>
    onSave({
      ...(baseDirty ? { creditsPerEur: parsedBase } : {}),
      ...(tiersDirty ? { rateTiers: parsedTiers } : {}),
    });

  return (
    <section
      aria-labelledby="economics-heading"
      className="mb-8 rounded-lg border border-hairline bg-canvas p-5 sm:p-6"
    >
      <h2 id="economics-heading" className="text-lg font-medium text-ink">
        Credit pricing
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Bigger purchases get more credits per euro, so customers buy more. Change the rates and every pack below updates
        before you save.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        <div>
          <Label htmlFor="economics-rate" className="text-sm font-medium text-ink">
            Base rate
          </Label>
          <div className="relative mt-2">
            <Input
              id="economics-rate"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={baseDraft}
              onChange={(event) => setBaseDraft(event.target.value)}
              aria-invalid={!baseValid}
              aria-describedby="economics-rate-hint"
              disabled={isSaving}
              className="h-11 pr-24 tabular-nums"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">
              credits / €1
            </span>
          </div>
          <p
            id="economics-rate-hint"
            className={cn("mt-1.5 text-xs tabular-nums", baseValid ? "text-muted-foreground" : "text-destructive")}
          >
            {baseValid ? `1 credit = ${formatEurCents(100 / rates.creditsPerEur)}` : "Whole number, 1 or more"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-ink">Better rates for bigger purchases</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            A purchase that costs at least this much at the new rate gets it. Rates must rise with the amount.
          </p>
          {rateDraft.length ? (
            <ul className="mt-3 flex flex-col gap-2">
              {rateDraft.map((row, index) => {
                const minEur = toInt(row.min_eur);
                const rate = toInt(row.credits_per_eur);
                const ok = Number.isFinite(minEur) && Number.isFinite(rate) && rate > 0;
                return (
                  <li key={row.key} className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-muted-foreground">From €</span>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      value={row.min_eur}
                      onChange={(event) => updateTier(row.key, { min_eur: event.target.value })}
                      aria-label={`Rate ${index + 1}: minimum purchase in euros`}
                      disabled={isSaving}
                      className="h-10 w-20 tabular-nums"
                    />
                    <span className="text-muted-foreground">get</span>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      value={row.credits_per_eur}
                      onChange={(event) => updateTier(row.key, { credits_per_eur: event.target.value })}
                      aria-label={`Rate ${index + 1}: credits per euro`}
                      disabled={isSaving}
                      className="h-10 w-20 tabular-nums"
                    />
                    <span className="text-muted-foreground">credits per €1</span>
                    {ok ? (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        ({tierMinCredits({ min_eur: minEur, credits_per_eur: rate })}+ credits, ≈{" "}
                        {pluralize(videosFor(minEur * rate), "video")}
                        {rate > rates.creditsPerEur
                          ? `, ${formatPercent((1 - rates.creditsPerEur / rate) * 100)} off`
                          : ""}
                        )
                      </span>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setRateDraft((current) => current.filter((r) => r.key !== row.key))}
                      disabled={isSaving}
                      aria-label={`Remove rate ${index + 1}`}
                    >
                      <Trash2Icon />
                    </Button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">None: every purchase pays the base rate.</p>
          )}
          <Button type="button" variant="outline" size="sm" className="mt-3" onClick={addTier} disabled={isSaving}>
            <PlusIcon />
            Add better rate
          </Button>
          {tierProblems.length ? (
            <Alert variant="destructive" className="mt-3">
              <InfoIcon />
              <AlertDescription>
                <ul className="list-disc pl-4">
                  {tierProblems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-medium text-ink">Every pack size</p>
          <p className="text-xs text-muted-foreground">
            Stripe fee:{" "}
            {stripeFeePct === null
              ? "no paid purchases yet, so it is left out"
              : `${formatPercent(stripeFeePct)}, the real average of ${pluralize(feeSamples, "purchase")}`}
            . Margin is for one {defaultTier?.name ?? "standard"} video at its most photos.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Switch id="economics-watermark" checked={watermarkRemoval} onCheckedChange={setWatermarkRemoval} />
            <Label htmlFor="economics-watermark" className="text-sm font-normal text-muted-foreground">
              Watermark removal
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="economics-import" checked={imported} onCheckedChange={setImported} />
            <Label htmlFor="economics-import" className="text-sm font-normal text-muted-foreground">
              Imported from a link
            </Label>
          </div>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pack</TableHead>
              <TableHead className="text-right">Customer pays</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Price per credit</TableHead>
              <TableHead className="text-right">We keep</TableHead>
              <TableHead className="text-right">Margin per video</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packs.map((pack) => {
              const margin = defaultTier ? tierEconomics(defaultTier, pack.netCentsPerCredit, addons, rates) : null;
              const isSelected = pack.videos === selected.videos;
              const negative = (margin?.marginCents ?? 0) < 0;
              return (
                <TableRow
                  key={pack.videos}
                  data-state={isSelected ? "selected" : undefined}
                  className="cursor-pointer"
                  onClick={() => setSelectedVideos(pack.videos)}
                >
                  <TableCell>
                    <button
                      type="button"
                      className="text-left font-medium outline-none focus-visible:underline"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedVideos(pack.videos)}
                    >
                      {pluralize(pack.videos, "video")}
                    </button>
                    <span className="block text-xs text-muted-foreground tabular-nums">
                      {pluralize(pack.credits, "credit")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{formatEurCents(pack.amountCents)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {pack.rate} / €1
                    {pack.rate > rates.creditsPerEur ? (
                      <span className="block text-xs text-success">
                        {formatPercent((1 - rates.creditsPerEur / pack.rate) * 100)} off
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{formatEurCents(100 / pack.rate)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatEurCents(pack.netCents)}
                    {pack.feeCents > 0 ? (
                      <span className="block text-xs text-muted-foreground">
                        −{formatEurCents(pack.feeCents)} Stripe
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell className={cn("text-right tabular-nums", negative && "text-destructive")}>
                    {margin ? formatEurCents(margin.marginCents) : "–"}
                    {margin ? (
                      <span className={cn("block text-xs", negative ? "text-destructive" : "text-muted-foreground")}>
                        {formatPercent(margin.marginPct)}
                      </span>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm">
        {cliffs.length ? (
          <div className="flex items-start gap-2">
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
            <p className="text-muted-foreground">
              A bigger pack costs less than the one before it:{" "}
              {cliffs
                .map(
                  (c) =>
                    `${c.to} videos ${formatEurCents(c.toCents)} vs ${c.from} videos ${formatEurCents(c.fromCents)}`,
                )
                .join("; ")}
              . Customers will skip the smaller one. Lower the amount or the rate jump to soften it.
            </p>
          </div>
        ) : null}
        {smallest.wholeEuros ? (
          <div className="flex items-start gap-2">
            <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            <p className="text-muted-foreground">
              At the base rate, packs move in steps of {PURCHASE_VIDEO_STEP} videos (
              {pluralize(smallest.credits, "credit")}), so prices are whole euros.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
            <p className="text-muted-foreground">
              A step of {PURCHASE_VIDEO_STEP} videos is {pluralize(smallest.credits, "credit")}, which is{" "}
              {formatEurCents((smallest.credits / rates.creditsPerEur) * 100)}
              {smallest.exactCents ? "" : " after rounding to the cent"}, not whole euros. Whole-euro steps at{" "}
              {wholeRates.join(", ")} credits per €1.
            </p>
          </div>
        )}
      </div>

      {rows.length ? (
        <>
          <p className="mt-8 font-medium text-ink">Margin per video size, {pluralize(selected.videos, "video")} pack</p>
          <p className="text-xs text-muted-foreground">
            Pick a pack above to compare. Costs use the provider prices below.
          </p>
          <Table className="mt-3">
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
        </>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">Add credit tiers to see the margin per video.</p>
      )}

      {baseDirty || tiersDirty ? (
        <div className="mt-6 flex flex-col gap-3 border-t border-hairline-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Unsaved changes. Purchases already started keep the price they were offered.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setBaseDraft(String(saved.creditsPerEur));
                setRateDraft(rateTiers.map(toDraft));
              }}
              disabled={isSaving}
            >
              Reset
            </Button>
            <Button onClick={save} disabled={!canSave}>
              {isSaving ? "Saving" : "Save changes"}
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
};
