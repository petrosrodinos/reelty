import { LedgerKindFormOptions } from "@/config/constants/dropdowns/usage/ledger-kind-form.options";
import type { LedgerKind } from "@/features/usage/interfaces/usage.interfaces";

export const LedgerKindFilterOptions: { id: LedgerKind | "all"; label: string }[] = [
  { id: "all", label: "All activity" },
  ...LedgerKindFormOptions,
];
