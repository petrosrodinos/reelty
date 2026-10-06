import { CostLedgerKindFormOptions } from "@/config/constants/dropdowns/admin/cost-ledger-kind-form.options";
import type { CostLedgerKind } from "@/features/admin/interfaces/admin.interfaces";

export const CostLedgerKindFilterOptions: { id: CostLedgerKind | "all"; label: string }[] = [
  { id: "all", label: "All activity" },
  ...CostLedgerKindFormOptions,
];
