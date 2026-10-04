import { z } from 'zod';
import { parseCorsUrls } from '../cors';

const optionalNumber = z.coerce.number().int().positive().optional();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'test', 'staging', 'production']),
  PORT: z.coerce.number().default(3000),

  // URLs / CORS / cookies
  APP_URL: z.string().url().optional(),
  LANDING_URL: z.string().url().optional(),
  CORS_URLS: z.preprocess(parseCorsUrls, z.array(z.string().url()).optional()),
  API_URL: z.string().url().optional(),
  COOKIE_DOMAIN: z.string().optional(),

  // Infra (required in staging/production, see superRefine)
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),

  // Google Cloud Storage
  GCS_PROJECT_ID: z.string().optional(),
  GCS_BUCKET_NAME: z.string().optional(),
  GCS_CREDENTIALS_JSON_BASE64: z.string().optional(),
  GCS_CREDENTIALS: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),

  // Providers (all optional: features degrade with clear error codes)
  APIFY_TOKEN: z.string().optional(),
  APIFY_WEBSITE_ACTOR_ID: z.string().optional(),
  APIFY_AIRBNB_ACTOR_ID: z.string().optional(),
  DEWATERMARK_API_KEY: z.string().optional(),
  DEWATERMARK_API_BASE_URL: z.string().url().optional(),
  VIDEO_PROVIDER: z.enum(['local', 'higgsfield']).optional(),
  HIGGSFIELD_API_BASE_URL: z.string().url().optional(),
  HIGGSFIELD_API_KEY: z.string().optional(),
  HIGGSFIELD_MAX_CLIP_CREDITS: z.coerce.number().positive().optional(),

  // ffmpeg (workers)
  FFMPEG_PATH: z.string().optional(),
  FFPROBE_PATH: z.string().optional(),
  FFMPEG_FONT_PATH: z.string().optional(),

  // Domain limits
  MAX_IMAGES: optionalNumber,
  MIN_IMAGES: optionalNumber,
  WM_MAX_ATTEMPTS: optionalNumber,
  DEFAULT_MONTHLY_QUOTA: z.coerce.number().int().min(0).optional(),

  // Bull Board
  BULL_BOARD_USER: z.string().optional(),
  BULL_BOARD_PASSWORD: z.string().optional(),
});

const LOCAL_DEV_JWT_SECRET = 'reelty-local-development-secret-do-not-use-in-prod';

export function validateEnv(config: Record<string, unknown>) {
  // dotenv yields '' for `KEY=`; treat empty values as unset.
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(config)) {
    if (value === '' || value === undefined) continue;
    cleaned[key] = value;
  }

  const parsed = EnvSchema.safeParse(cleaned);

  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variables');
  }

  const data = parsed.data;
  const strict = data.NODE_ENV === 'staging' || data.NODE_ENV === 'production';
  const problems: string[] = [];

  if (strict) {
    if (!data.DATABASE_URL) problems.push('DATABASE_URL is required');
    if (!data.REDIS_URL) problems.push('REDIS_URL is required');
    if (!data.JWT_SECRET) problems.push('JWT_SECRET is required');
  }
  if (data.NODE_ENV !== 'local' && data.JWT_SECRET && data.JWT_SECRET.length < 32) {
    problems.push('JWT_SECRET must be at least 32 characters');
  }
  if (data.DATABASE_URL && !/^postgres(ql)?:\/\//.test(data.DATABASE_URL)) {
    problems.push('DATABASE_URL must be a postgres connection string');
  }

  if (problems.length) {
    console.error(`Invalid environment variables: ${problems.join('; ')}`);
    throw new Error('Invalid environment variables');
  }

  if (!data.JWT_SECRET) {
    data.JWT_SECRET = LOCAL_DEV_JWT_SECRET;
  }

  return data;
}

export type EnvConfig = z.infer<typeof EnvSchema>;
