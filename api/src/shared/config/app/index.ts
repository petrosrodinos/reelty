/** Static, non-secret app configuration. Not env-driven; change here and redeploy. */
export const appConfig = {
  limits: {
    /** Fewest photos any video can use (render needs at least 3 clips). The real range comes from the credit tiers. */
    minImages: 3,
    /** Technical guard on the tiers' top end and on per-request image arrays. */
    maxImagesCeiling: 100,
    wmMaxAttempts: 2,
  },
  email: {
    from: 'Reelty <info@logiqdev.com>',
  },
  /** 'auto' = higgsfield when HIGGSFIELD_API_KEY is set, else local. Or force 'local' | 'higgsfield'. */
  videoProvider: 'auto' as 'auto' | 'local' | 'higgsfield',
  apify: {
    websiteActorId: 'apify/web-scraper',
    airbnbActorId: 'tri_angle/airbnb-rooms-urls-scraper',
  },
  dewatermark: {
    baseUrl: 'https://platform.dewatermark.ai',
  },
  higgsfield: {
    baseUrl: 'https://api.higgsfield.ai',
    /** Per-clip credit ceiling for the cost preflight. */
    maxClipCredits: 6,
  },
} as const;
