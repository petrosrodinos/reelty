import { API_BASE_URL } from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { CreditsPricing } from "@/features/credits/interfaces/credits.interfaces";

const REVALIDATE_SECONDS = 300;

/** Server-side fetch of the public pricing for the landing page. Null when the API is unreachable, so the page still renders. */
export async function fetchPublicPricing(): Promise<CreditsPricing | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${ApiRoutes.pricing}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as CreditsPricing;
  } catch {
    return null;
  }
}
