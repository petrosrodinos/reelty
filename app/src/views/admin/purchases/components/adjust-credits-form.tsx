"use client";

import { useState, type FC, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAdjustUserCredits } from "@/features/admin/hooks/use-admin";
import type { AdminUserOption } from "@/features/admin/interfaces/admin.interfaces";
import { pluralize } from "@/lib/format.utils";

interface AdjustCreditsFormProps {
  user: AdminUserOption;
}

/** Manual balance change for the selected user (goodwill, support refunds). Negative removes credits. */
export const AdjustCreditsForm: FC<AdjustCreditsFormProps> = ({ user }) => {
  const adjust = useAdjustUserCredits();
  const [credits, setCredits] = useState("");
  const [note, setNote] = useState("");
  const amount = Number(credits);
  const valid = /^-?\d+$/.test(credits.trim()) && amount !== 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) return;
    adjust.mutate(
      { userId: user.id, credits: amount, note: note.trim() },
      {
        onSuccess: () => {
          setCredits("");
          setNote("");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex flex-col gap-3 rounded-lg border border-hairline p-5 md:flex-row md:items-end"
    >
      <div className="md:mr-auto">
        <p className="font-medium text-ink">{user.email}</p>
        <p className="text-sm text-muted-foreground tabular-nums">Balance: {pluralize(user.credit_balance, "credit")}</p>
      </div>
      <Input
        aria-label="Credits to add (negative to remove)"
        placeholder="+5 or -2"
        inputMode="numeric"
        value={credits}
        onChange={(event) => setCredits(event.target.value)}
        aria-invalid={credits !== "" && !valid}
        className="h-11 md:w-32"
      />
      <Input
        aria-label="Note"
        placeholder="Note (optional)"
        maxLength={200}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        className="h-11 md:w-64"
      />
      <Button type="submit" className="h-11" disabled={!valid || adjust.isPending}>
        {adjust.isPending ? <Spinner /> : null}
        Adjust credits
      </Button>
    </form>
  );
};
