import { PurchaseStatuses, type PurchaseStatus } from "@/features/billing/interfaces/billing.interfaces";

/** Canonical labels for credit purchase statuses. */
export const PurchaseStatusFormOptions: { id: PurchaseStatus; label: string }[] = [
  { id: PurchaseStatuses.PAID, label: "Paid" },
  { id: PurchaseStatuses.PENDING, label: "Pending" },
  { id: PurchaseStatuses.PARTIALLY_REFUNDED, label: "Partially refunded" },
  { id: PurchaseStatuses.REFUNDED, label: "Refunded" },
  { id: PurchaseStatuses.EXPIRED, label: "Expired" },
  { id: PurchaseStatuses.FAILED, label: "Failed" },
];
