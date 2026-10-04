"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsage } from "@/features/usage/services/usage.services";

export const USAGE_QUERY_KEY = "usage";

/** Monthly quota plus the user's single active render (if any). Refreshed while a render is active. */
export const useUsage = (options: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: [USAGE_QUERY_KEY],
    queryFn: getUsage,
    enabled: options.enabled ?? true,
    staleTime: 15_000,
    refetchInterval: (query) => (query.state.data?.active_render_project_id ? 10_000 : false),
  });
};
