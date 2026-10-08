import { PurchaseStatusFormOptions } from "@/config/constants/dropdowns/billing/purchase-status-form.options";
import type { PurchaseStatus } from "@/features/billing/interfaces/billing.interfaces";

export const PurchaseStatusFilterOptions: { id: PurchaseStatus | "all"; label: string }[] = [
  { id: "all", label: "All statuses" },
  ...PurchaseStatusFormOptions,
];
