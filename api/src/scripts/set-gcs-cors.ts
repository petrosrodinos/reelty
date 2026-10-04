/**
 * Applies the CORS configuration the browser needs for direct uploads (PUT) and
 * playback / downloads (GET, Range) to the private Reelty bucket.
 *
 * Usage (reads GCS_* and CORS_URLS / APP_URL from the environment):
 *   npm run gcs:cors                      # env already exported / set by the platform
 *   npm run gcs:cors:staging              # loads .env.staging first
 *   npm run gcs:cors -- https://app.reelty.app https://www.reelty.app   # explicit origins
 */
import type { ConfigService } from '@nestjs/config';
import { GcsConfig } from '../integrations/storage/gcs/config/gcs.config';
import { GcsObjectsService } from '../integrations/storage/gcs/services/gcs-objects.service';
import { parseCorsUrls, resolveCorsOrigins } from '../shared/config/cors';

async function main() {
  const env = process.env;
  const configShim = { get: (key: string) => env[key] || undefined } as unknown as ConfigService;

  const cliOrigins = process.argv.slice(2).filter((arg) => /^https?:\/\//.test(arg));
  const origins = cliOrigins.length
    ? cliOrigins.map((origin) => origin.replace(/\/+$/, ''))
    : resolveCorsOrigins({
        nodeEnv: env.NODE_ENV,
        corsUrls: parseCorsUrls(env.CORS_URLS),
        appUrl: env.APP_URL,
        landingUrl: env.LANDING_URL,
      });

  if (origins.length === 0) {
    throw new Error('No origins to allow. Set CORS_URLS / APP_URL or pass origins as arguments.');
  }

  const gcsConfig = new GcsConfig(configShim);
  if (!gcsConfig.getStorageClient()) {
    throw new Error('GCS is not configured (GCS_PROJECT_ID and GCS_BUCKET_NAME are required).');
  }

  await new GcsObjectsService(gcsConfig).setCors(origins);
  console.log(`CORS applied to bucket "${gcsConfig.getBucketName()}" for: ${origins.join(', ')}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
