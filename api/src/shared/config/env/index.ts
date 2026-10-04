import { parseCorsUrls } from '../cors';

const num = (value: string | undefined) =>
  value !== undefined && value !== '' ? Number(value) : undefined;
const str = (value: string | undefined) => (value ? value : undefined);

export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
  APP_URL: str(process.env.APP_URL),
  LANDING_URL: str(process.env.LANDING_URL),
  CORS_URLS: parseCorsUrls(process.env.CORS_URLS),
  API_URL: str(process.env.API_URL),
  COOKIE_DOMAIN: str(process.env.COOKIE_DOMAIN),
  DATABASE_URL: str(process.env.DATABASE_URL),
  REDIS_URL: str(process.env.REDIS_URL),
  JWT_SECRET: str(process.env.JWT_SECRET),
  GCS_PROJECT_ID: str(process.env.GCS_PROJECT_ID),
  GCS_BUCKET_NAME: str(process.env.GCS_BUCKET_NAME),
  GCS_CREDENTIALS_JSON_BASE64: str(process.env.GCS_CREDENTIALS_JSON_BASE64),
  GCS_CREDENTIALS: str(process.env.GCS_CREDENTIALS),
  RESEND_API_KEY: str(process.env.RESEND_API_KEY),
  RESEND_FROM: str(process.env.RESEND_FROM),
  APIFY_TOKEN: str(process.env.APIFY_TOKEN),
  APIFY_WEBSITE_ACTOR_ID: str(process.env.APIFY_WEBSITE_ACTOR_ID),
  APIFY_AIRBNB_ACTOR_ID: str(process.env.APIFY_AIRBNB_ACTOR_ID),
  DEWATERMARK_API_KEY: str(process.env.DEWATERMARK_API_KEY),
  DEWATERMARK_API_BASE_URL: str(process.env.DEWATERMARK_API_BASE_URL),
  VIDEO_PROVIDER: str(process.env.VIDEO_PROVIDER),
  HIGGSFIELD_API_BASE_URL: str(process.env.HIGGSFIELD_API_BASE_URL),
  HIGGSFIELD_API_KEY: str(process.env.HIGGSFIELD_API_KEY),
  HIGGSFIELD_MAX_CLIP_CREDITS: num(process.env.HIGGSFIELD_MAX_CLIP_CREDITS),
  FFMPEG_PATH: str(process.env.FFMPEG_PATH),
  FFPROBE_PATH: str(process.env.FFPROBE_PATH),
  FFMPEG_FONT_PATH: str(process.env.FFMPEG_FONT_PATH),
  MAX_IMAGES: num(process.env.MAX_IMAGES),
  MIN_IMAGES: num(process.env.MIN_IMAGES),
  WM_MAX_ATTEMPTS: num(process.env.WM_MAX_ATTEMPTS),
  DEFAULT_MONTHLY_QUOTA: num(process.env.DEFAULT_MONTHLY_QUOTA),
  BULL_BOARD_USER: str(process.env.BULL_BOARD_USER),
  BULL_BOARD_PASSWORD: str(process.env.BULL_BOARD_PASSWORD),
});
