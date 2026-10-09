import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ApiException } from '@/shared/errors/api-exception';
import { ErrorCodes } from '@/shared/config/error-codes';
import {
  APP_CONFIG_DEFAULTS,
  AppConfigKey,
  AppConfigKeys,
  isAppConfigKey,
} from './app-config.constants';
import type {
  AppConfigItem,
  CostFigures,
} from './interfaces/app-config.interface';

/** Operator-editable prices (`app_config` table), with built-in defaults for rows that do not exist yet. */
@Injectable()
export class AppConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async getNumber(key: AppConfigKey): Promise<number> {
    const row = await this.prisma.appConfig.findUnique({ where: { key } });
    return row?.value ?? APP_CONFIG_DEFAULTS[key].value;
  }

  async list(): Promise<AppConfigItem[]> {
    const rows = await this.prisma.appConfig.findMany();
    const stored = new Map(rows.map((r) => [r.key, r]));
    return (Object.keys(APP_CONFIG_DEFAULTS) as AppConfigKey[]).map((key) => {
      const row = stored.get(key);
      const fallback = APP_CONFIG_DEFAULTS[key];
      return {
        key,
        value: row?.value ?? fallback.value,
        // Unit and description are owned by the code; stored copies may predate a wording change.
        unit: fallback.unit,
        description: fallback.description,
        integer: !!fallback.integer,
        min: fallback.min ?? 0,
        stored: !!row,
        updated_at: row?.updated_at.toISOString() ?? null,
      };
    });
  }

  async update(key: string, value: number): Promise<AppConfigItem> {
    if (!isAppConfigKey(key))
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        ErrorCodes.NOT_FOUND,
        'Unknown config key',
      );
    const fallback = APP_CONFIG_DEFAULTS[key];
    const min = fallback.min ?? 0;
    if (fallback.integer && !Number.isInteger(value)) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        'This value must be a whole number.',
      );
    }
    if (value < min) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        `This value must be ${min} or more.`,
      );
    }
    const meta = { unit: fallback.unit, description: fallback.description };
    const row = await this.prisma.appConfig.upsert({
      where: { key },
      update: { value, ...meta },
      create: { key, value, ...meta },
    });
    return {
      key: row.key,
      value: row.value,
      unit: row.unit,
      description: row.description,
      integer: !!fallback.integer,
      min,
      stored: true,
      updated_at: row.updated_at.toISOString(),
    };
  }

  // ------------------------------------------------------------------ cost figures (stored on ledger rows)

  /** Higgsfield bills in credits; the USD figure is always our estimate (credits x configured rate). */
  async higgsfieldCost(credits: number): Promise<CostFigures> {
    const rate = await this.getNumber(AppConfigKeys.HIGGSFIELD_USD_PER_CREDIT);
    return { credits, cost_usd: credits * rate, estimated: true };
  }

  /** Dewatermark bills in credits per image; the USD figure is always our estimate. */
  async dewatermarkCost(images: number): Promise<CostFigures> {
    const [perImage, rate] = await Promise.all([
      this.getNumber(AppConfigKeys.DEWATERMARK_CREDITS_PER_IMAGE),
      this.getNumber(AppConfigKeys.DEWATERMARK_USD_PER_CREDIT),
    ]);
    const credits = perImage * images;
    return { credits, cost_usd: credits * rate, estimated: true };
  }

  /** Apify reports real USD usage; the configured per-run price is used only when it does not. */
  async apifyCost(reportedUsd: number | null): Promise<CostFigures> {
    if (reportedUsd !== null)
      return { credits: null, cost_usd: reportedUsd, estimated: false };
    const fallback = await this.getNumber(
      AppConfigKeys.APIFY_FALLBACK_USD_PER_RUN,
    );
    return { credits: null, cost_usd: fallback, estimated: true };
  }
}
