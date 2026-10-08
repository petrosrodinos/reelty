/** Keys of the `app_config` table. Add a key here (with a default) before reading it anywhere. */
export const AppConfigKeys = {
  HIGGSFIELD_USD_PER_CREDIT: 'higgsfield.usd_per_credit',
  HIGGSFIELD_FALLBACK_CREDITS_PER_CLIP: 'higgsfield.fallback_credits_per_clip',
  DEWATERMARK_CREDITS_PER_IMAGE: 'dewatermark.credits_per_image',
  DEWATERMARK_USD_PER_CREDIT: 'dewatermark.usd_per_credit',
  APIFY_FALLBACK_USD_PER_RUN: 'apify.fallback_usd_per_run',
} as const;
export type AppConfigKey = (typeof AppConfigKeys)[keyof typeof AppConfigKeys];

export interface AppConfigDefault {
  value: number;
  unit: 'usd' | 'credits';
  description: string;
}

/**
 * Used when a row is missing (e.g. before the migration seed ran). Mirrors the seed in
 * prisma/migrations/0002_app_config_and_cost. Higgsfield figures come from its estimate endpoint.
 */
export const APP_CONFIG_DEFAULTS: Record<AppConfigKey, AppConfigDefault> = {
  [AppConfigKeys.HIGGSFIELD_USD_PER_CREDIT]: {
    value: 0.0627,
    unit: 'usd',
    description: 'USD cost of one Higgsfield credit (from the API estimate: $0.179 / 2.856 credits, after the 15% API discount).',
  },
  [AppConfigKeys.HIGGSFIELD_FALLBACK_CREDITS_PER_CLIP]: {
    value: 2.856,
    unit: 'credits',
    description: 'Credits per 5 s Kling 2.5 turbo clip, used only when the estimate endpoint is unavailable.',
  },
  [AppConfigKeys.DEWATERMARK_CREDITS_PER_IMAGE]: {
    value: 1,
    unit: 'credits',
    description: 'Dewatermark credits charged per image.',
  },
  [AppConfigKeys.DEWATERMARK_USD_PER_CREDIT]: {
    value: 0.1,
    unit: 'usd',
    description: 'USD cost of one dewatermark credit. Set from your plan price.',
  },
  [AppConfigKeys.APIFY_FALLBACK_USD_PER_RUN]: {
    value: 0.005,
    unit: 'usd',
    description: 'USD cost of one listing scrape, used only when Apify does not report the run usage.',
  },
};

export const isAppConfigKey = (key: string): key is AppConfigKey => key in APP_CONFIG_DEFAULTS;
