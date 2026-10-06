import { CostLedgerKinds, type CostLedgerKind } from "@/features/admin/interfaces/admin.interfaces";

/** Canonical labels for every ledger kind in the operator cost views. */
export const CostLedgerKindFormOptions: { id: CostLedgerKind; label: string }[] = [
  { id: CostLedgerKinds.HIGGSFIELD, label: "Clip generation (Higgsfield)" },
  { id: CostLedgerKinds.DEWATERMARK, label: "Watermark removal" },
  { id: CostLedgerKinds.SCRAPE, label: "Listing import (Apify)" },
  { id: CostLedgerKinds.VIDEO, label: "Video charge" },
  { id: CostLedgerKinds.VIDEO_REFUND, label: "Video refund" },
];
