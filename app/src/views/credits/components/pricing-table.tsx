import type { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VideoAddonFormOptions } from "@/config/constants/dropdowns/credits/video-addon-form.options";
import type { CreditsPricing } from "@/features/credits/interfaces/credits.interfaces";
import { pluralize } from "@/lib/format.utils";

interface PricingTableProps {
  pricing: CreditsPricing;
}

/** What a video costs: one row per size tier, then the flat add-ons that apply. */
export const PricingTable: FC<PricingTableProps> = ({ pricing }) => {
  const addons = VideoAddonFormOptions.filter((option) => pricing.addons[option.id] > 0);

  return (
    <section aria-labelledby="pricing-heading" className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6">
      <h2 id="pricing-heading" className="text-lg font-medium text-ink">
        What a video costs
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Credits are taken when you create a video, and returned automatically if it fails.
      </p>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Video</TableHead>
            <TableHead>Photos</TableHead>
            <TableHead className="text-right">Credits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricing.tiers.map((tier) => (
            <TableRow key={tier.id}>
              <TableCell className="font-medium">{tier.name}</TableCell>
              <TableCell className="tabular-nums">
                {tier.min_clips === tier.max_clips ? tier.min_clips : `${tier.min_clips}–${tier.max_clips}`}
              </TableCell>
              <TableCell className="text-right tabular-nums">{tier.credits}</TableCell>
            </TableRow>
          ))}
          {addons.map((addon) => (
            <TableRow key={addon.id}>
              <TableCell className="text-muted-foreground">+ {addon.label}</TableCell>
              <TableCell className="text-muted-foreground">Per video</TableCell>
              <TableCell className="text-right tabular-nums text-muted-foreground">
                +{pricing.addons[addon.id]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pricing.signup_grant > 0 ? (
        <p className="mt-4 text-xs text-muted-foreground">
          New accounts start with {pluralize(pricing.signup_grant, "free credit")}.
        </p>
      ) : null}
    </section>
  );
};
