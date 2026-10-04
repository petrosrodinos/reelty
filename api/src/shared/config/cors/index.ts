import { ConfigService } from '@nestjs/config';

export const LOCAL_CORS_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3001',
  'http://localhost:3002',
];

export function parseCorsUrls(value: unknown): string[] | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }

  const urls = value
    .split(',')
    .map((url) => url.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  return urls.length ? urls : undefined;
}

export function resolveCorsOrigins(options: {
  nodeEnv?: string;
  corsUrls?: string[];
  appUrl?: string;
  landingUrl?: string;
}): string[] {
  const configured = options.corsUrls?.length
    ? options.corsUrls
    : [options.appUrl, options.landingUrl].filter((url): url is string => Boolean(url));
  const normalized = configured.map((url) => url.replace(/\/+$/, ''));

  if (options.nodeEnv === 'local') {
    return Array.from(new Set([...LOCAL_CORS_ORIGINS, ...normalized]));
  }

  return Array.from(new Set(normalized));
}

export function getAllowedOrigins(config: ConfigService): string[] {
  return resolveCorsOrigins({
    nodeEnv: config.get<string>('NODE_ENV'),
    corsUrls: config.get<string[]>('CORS_URLS'),
    appUrl: config.get<string>('APP_URL'),
    landingUrl: config.get<string>('LANDING_URL'),
  });
}
