"use client";

import { useState, type FC, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppConfigKeyFormOptions } from "@/config/constants/dropdowns/admin/app-config-key-form.options";
import type { AppConfigItem } from "@/features/admin/interfaces/admin.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatRelative } from "@/lib/format.utils";

interface ConfigRowProps {
  item: AppConfigItem;
  isSaving: boolean;
  onSave: (value: number) => void;
}

/** One editable price. Remounted (via key) after each save so the draft always starts from the stored value. */
export const ConfigRow: FC<ConfigRowProps> = ({ item, isSaving, onSave }) => {
  const [draft, setDraft] = useState(String(item.value));
  const parsed = Number(draft);
  const valid =
    draft.trim() !== "" && Number.isFinite(parsed) && parsed >= item.min && (!item.integer || Number.isInteger(parsed));
  const prefix = item.unit === "usd" ? "$" : null;
  const suffix = item.unit === "credits" ? "credits" : null;
  const dirty = valid && parsed !== item.value;
  const inputId = `config-${item.key}`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (dirty) onSave(parsed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:gap-8">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={inputId} className="font-medium text-ink">
            {getDropdownOptionLabel(AppConfigKeyFormOptions, item.key)}
          </label>
          {!item.stored ? <Badge variant="outline">Default, not saved yet</Badge> : null}
        </div>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{item.key}</p>
        {item.description ? <p className="mt-2 max-w-xl text-sm text-muted-foreground">{item.description}</p> : null}
        {item.updated_at ? (
          <p className="mt-2 text-xs text-muted-foreground">Updated {formatRelative(item.updated_at)}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-40">
          {prefix ? (
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-sm text-muted-foreground">
              {prefix}
            </span>
          ) : null}
          <Input
            id={inputId}
            type="number"
            inputMode={item.integer ? "numeric" : "decimal"}
            min={item.min}
            step={item.integer ? 1 : "any"}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-invalid={!valid}
            aria-describedby={!valid ? `${inputId}-error` : undefined}
            disabled={isSaving}
            className={prefix ? "h-11 pl-7 tabular-nums" : suffix ? "h-11 pr-16 tabular-nums" : "h-11 tabular-nums"}
          />
          {suffix ? (
            <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">
              {suffix}
            </span>
          ) : null}
          {!valid ? (
            <p id={`${inputId}-error`} className="absolute top-full mt-1 text-xs text-destructive">
              {item.integer ? `Whole number, ${item.min} or more` : `${item.min} or more`}
            </p>
          ) : null}
        </div>
        <Button type="submit" disabled={!dirty || isSaving} className="h-11">
          {isSaving ? "Saving" : "Save"}
        </Button>
      </div>
    </form>
  );
};
