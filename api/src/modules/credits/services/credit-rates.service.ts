import { HttpStatus, Injectable } from '@nestjs/common';
import type { CreditRateTier } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AppConfigKeys } from '@/modules/app-config/app-config.constants';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { ReplaceCreditRateTiersDto } from '../dto/credit-rate-tier.dto';
import type { CreditRateTierJson } from '../interfaces/credits.interface';

type RateShape = Pick<CreditRateTier, 'min_eur' | 'credits_per_eur'>;

/**
 * Credits per €1 for a purchase of `credits` credits: the best tier it reaches, else the base rate. A tier
 * is reached when the purchase costs at least its min_eur at that tier's rate (credits >= min_eur x rate).
 * Exported for unit tests.
 */
export function rateFor(
  credits: number,
  baseRate: number,
  tiers: RateShape[],
): number {
  const reached = tiers.filter((t) => credits >= t.min_eur * t.credits_per_eur);
  return reached.length
    ? Math.max(...reached.map((t) => t.credits_per_eur))
    : baseRate;
}

/**
 * A bigger purchase must never get a worse rate: amounts are unique, every rate beats the base, and rates
 * rise with the amount. Empty list means valid. Exported for unit tests.
 */
export function rateTierProblems(
  tiers: RateShape[],
  baseRate: number,
): string[] {
  const problems: string[] = [];
  for (const t of tiers) {
    if (t.credits_per_eur <= baseRate)
      problems.push(
        `The rate from €${t.min_eur} must be more than the base ${baseRate} credits per €1.`,
      );
  }
  const sorted = [...tiers].sort((a, b) => a.min_eur - b.min_eur);
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (cur.min_eur === prev.min_eur)
      problems.push(`Two tiers start at €${cur.min_eur}.`);
    else if (cur.credits_per_eur <= prev.credits_per_eur)
      problems.push(
        `The rate from €${cur.min_eur} must be more than the ${prev.credits_per_eur} from €${prev.min_eur}.`,
      );
  }
  return problems;
}

/** Admin-managed volume pricing: better credits-per-euro rates for bigger purchases. */
@Injectable()
export class CreditRatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appConfig: AppConfigService,
  ) {}

  async list(): Promise<CreditRateTier[]> {
    return this.prisma.creditRateTier.findMany({ orderBy: { min_eur: 'asc' } });
  }

  async listJson(): Promise<CreditRateTierJson[]> {
    return (await this.list()).map((t) => this.serialize(t));
  }

  /** Credits per €1 a purchase of `credits` credits is priced at, with the current base and tiers. */
  async rateFor(credits: number): Promise<number> {
    const [baseRate, tiers] = await Promise.all([
      this.appConfig.getNumber(AppConfigKeys.BILLING_CREDITS_PER_EUR),
      this.list(),
    ]);
    return rateFor(credits, baseRate, tiers);
  }

  /** Replaces the whole set in one transaction; it is only valid as a whole. */
  async replaceAll(
    dto: ReplaceCreditRateTiersDto,
  ): Promise<CreditRateTierJson[]> {
    const baseRate = await this.appConfig.getNumber(
      AppConfigKeys.BILLING_CREDITS_PER_EUR,
    );
    const problems = rateTierProblems(dto.tiers, baseRate);
    if (problems.length) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        problems.join(' '),
        { problems },
      );
    }
    await this.prisma.$transaction([
      this.prisma.creditRateTier.deleteMany({}),
      this.prisma.creditRateTier.createMany({
        data: dto.tiers.map((t) => ({
          min_eur: t.min_eur,
          credits_per_eur: t.credits_per_eur,
        })),
      }),
    ]);
    return this.listJson();
  }

  serialize(t: CreditRateTier): CreditRateTierJson {
    return {
      id: t.id,
      min_eur: t.min_eur,
      credits_per_eur: t.credits_per_eur,
      updated_at: t.updated_at.toISOString(),
    };
  }
}
