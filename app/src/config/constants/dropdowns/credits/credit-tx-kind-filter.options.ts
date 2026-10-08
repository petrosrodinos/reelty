import { CreditTxKindFormOptions } from "@/config/constants/dropdowns/credits/credit-tx-kind-form.options";
import type { CreditTxKind } from "@/features/credits/interfaces/credits.interfaces";

export const CreditTxKindFilterOptions: { id: CreditTxKind | "all"; label: string }[] = [
  { id: "all", label: "All activity" },
  ...CreditTxKindFormOptions,
];
