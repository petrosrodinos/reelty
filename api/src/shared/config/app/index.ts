/** Static, non-secret app configuration. Not env-driven; change here and redeploy. */
export const appConfig = {
  limits: {
    minImages: 3,
    maxImages: 12,
    wmMaxAttempts: 2,
  },
  email: {
    from: 'Reelty <hello@reelty.app>',
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
