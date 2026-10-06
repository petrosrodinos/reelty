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
 * prisma/migrations/0002_app_config_and_cost. The USD rates are placeholders until set from real plan prices.
 */
export const APP_CONFIG_DEFAULTS: Record<AppConfigKey, AppConfigDefault> = {
  [AppConfigKeys.HIGGSFIELD_USD_PER_CREDIT]: {
    value: 0.05,
    unit: 'usd',
    description: 'PLACEHOLDER: USD cost of one Higgsfield credit. Set from your plan price (plan price / credits in plan).',
  },
  [AppConfigKeys.HIGGSFIELD_FALLBACK_CREDITS_PER_CLIP]: {
    value: 7.5,
    unit: 'credits',
    description: 'Credits per 5 s clip, used only when the cost preflight answers in an unexpected shape.',
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
