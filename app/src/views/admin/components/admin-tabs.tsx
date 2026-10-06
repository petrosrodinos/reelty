"use client";

import type { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes/routes";

const tabs = [
  { label: "Prices", href: Routes.adminConfig },
  { label: "Cost ledger", href: Routes.adminUsage },
];

export const AdminTabs: FC = () => {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin sections" className="mb-8 flex gap-1 border-b border-hairline-soft">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              active ? "border-brand text-ink" : "border-transparent text-muted-foreground hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};
