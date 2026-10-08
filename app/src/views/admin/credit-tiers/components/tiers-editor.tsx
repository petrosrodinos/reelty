"use client";

import { useState, type FC } from "react";
import { InfoIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useReplaceCreditTiers } from "@/features/admin/hooks/use-admin";
import type { CreditTier } from "@/features/credits/interfaces/credits.interfaces";
import { tierCoverageProblems } from "@/features/credits/utils/credit-pricing.utils";
import { VideoLimits } from "@/lib/format.utils";

interface DraftTier {
  /** Server id, or a local key for rows not saved yet. */
  key: string;
  id?: string;
  name: string;
  min_clips: string;
  max_clips: string;
  credits: string;
  is_default: boolean;
}

const toDraft = (tier: CreditTier): DraftTier => ({
  key: tier.id,
  id: tier.id,
  name: tier.name,
  min_clips: String(tier.min_clips),
  max_clips: String(tier.max_clips),
  credits: String(tier.credits),
  is_default: tier.is_default,
});

const toInt = (value: string) => (/^\d+$/.test(value.trim()) ? Number(value) : NaN);

interface TiersEditorProps {
  tiers: CreditTier[];
}

/**
 * Edits the whole tier set as one draft and saves it in one request, so a boundary between two tiers
 * can move without passing through an invalid state. Remounted (via key) after each save.
 */
export const TiersEditor: FC<TiersEditorProps> = ({ tiers }) => {
  const save = useReplaceCreditTiers();
  const [rows, setRows] = useState<DraftTier[]>(() => tiers.map(toDraft));

  const parsed = rows.map((row) => ({
    id: row.id,
    name: row.name,
    min_clips: toInt(row.min_clips),
    max_clips: toInt(row.max_clips),
    credits: toInt(row.credits),
    is_default: row.is_default,
  }));
  const numbersValid = parsed.every(
    (t) => Number.isFinite(t.min_clips) && Number.isFinite(t.max_clips) && Number.isFinite(t.credits),
  );
  const problems = numbersValid
    ? tierCoverageProblems(parsed, VideoLimits.minImages, VideoLimits.maxImages)
    : ["Clip counts and credits must be whole numbers."];
  const dirty = JSON.stringify(rows) !== JSON.stringify(tiers.map(toDraft));

  const update = (key: string, patch: Partial<DraftTier>) =>
    setRows((current) =>
      current.map((row) => {
        if (row.key === key) return { ...row, ...patch };
        // Only one default: checking a row unchecks the others.
        return patch.is_default ? { ...row, is_default: false } : row;
      }),
    );

  const addRow = () =>
    setRows((current) => [
      ...current,
      {
        key: `new-${Date.now()}`,
        name: "",
        min_clips: "",
        max_clips: String(VideoLimits.maxImages),
        credits: "",
        is_default: current.length === 0,
      },
    ]);

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-lg border border-hairline">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-28">Min photos</TableHead>
              <TableHead className="w-28">Max photos</TableHead>
              <TableHead className="w-28">Credits</TableHead>
              <TableHead className="w-24 text-center">Default</TableHead>
              <TableHead className="w-14">
                <span className="sr-only">Remove</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                <TableCell>
                  <Input
                    aria-label="Tier name"
                    value={row.name}
                    maxLength={40}
                    onChange={(event) => update(row.key, { name: event.target.value })}
                    className="h-10 min-w-32"
                  />
                </TableCell>
                {(["min_clips", "max_clips", "credits"] as const).map((field) => (
                  <TableCell key={field}>
                    <Input
                      aria-label={field.replace("_", " ")}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      value={row[field]}
                      onChange={(event) => update(row.key, { [field]: event.target.value })}
                      aria-invalid={!Number.isFinite(toInt(row[field]))}
                      className="h-10 tabular-nums"
                    />
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <Checkbox
                    aria-label="Default tier for the purchase slider"
                    checked={row.is_default}
                    onCheckedChange={(checked) => checked && update(row.key, { is_default: true })}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${row.name || "tier"}`}
                    onClick={() => setRows((current) => current.filter((r) => r.key !== row.key))}
                  >
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {problems.length > 0 ? (
        <Alert className="border-hairline bg-notice-warn">
          <InfoIcon aria-hidden="true" />
          <AlertDescription className="text-ink">
            <ul className="list-disc pl-4">
              {[...new Set(problems)].map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={addRow}>
          <PlusIcon /> Add tier
        </Button>
        <div className="ml-auto flex gap-3">
          <Button variant="ghost" disabled={!dirty || save.isPending} onClick={() => setRows(tiers.map(toDraft))}>
            Reset
          </Button>
          <Button
            disabled={!dirty || problems.length > 0 || save.isPending}
            onClick={() =>
              save.mutate(
                parsed.map((t) => ({
                  id: t.id,
                  name: t.name.trim(),
                  min_clips: t.min_clips,
                  max_clips: t.max_clips,
                  credits: t.credits,
                  is_default: t.is_default,
                })),
              )
            }
          >
            {save.isPending ? <Spinner /> : null}
            Save tiers
          </Button>
        </div>
      </div>
    </div>
  );
};
