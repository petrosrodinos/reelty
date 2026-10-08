import { CreditTxKinds, type CreditTxKind } from "@/features/credits/interfaces/credits.interfaces";

/** Canonical labels for credit history entries. */
export const CreditTxKindFormOptions: { id: CreditTxKind; label: string }[] = [
  { id: CreditTxKinds.PURCHASE, label: "Credits bought" },
  { id: CreditTxKinds.VIDEO_CHARGE, label: "Video created" },
  { id: CreditTxKinds.VIDEO_REFUND, label: "Video refunded" },
  { id: CreditTxKinds.SIGNUP_GRANT, label: "Welcome credits" },
  { id: CreditTxKinds.PURCHASE_REFUND, label: "Purchase refunded" },
  { id: CreditTxKinds.ADMIN_ADJUSTMENT, label: "Adjustment by support" },
];
