import { LedgerKinds, type LedgerKind } from "@/features/usage/interfaces/usage.interfaces";

/** Canonical ledger kind labels. Used by the usage table and its filter. */
export const LedgerKindFormOptions: { id: LedgerKind; label: string }[] = [
  { id: LedgerKinds.VIDEO, label: "Video created" },
  { id: LedgerKinds.VIDEO_REFUND, label: "Video refunded" },
];
