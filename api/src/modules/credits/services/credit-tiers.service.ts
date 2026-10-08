import { HttpStatus, Injectable } from '@nestjs/common';
import type { CreditTier } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { appConfig } from '@/shared/config/app';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { ReplaceCreditTiersDto } from '../dto/credit-tier.dto';
import type { CreditTierJson } from '../interfaces/credits.interface';

type TierShape = Pick<
  CreditTier,
  'name' | 'min_clips' | 'max_clips' | 'credits' | 'is_default'
>;

/** Photos-per-video range of a video, set by the tiers: lowest min_clips to highest max_clips. */
export interface ImageLimits {
  minImages: number;
  maxImages: number;
}

/**
 * Tiers are contiguous (no gaps, no overlaps) and exactly one is the default. They set the allowed
 * photo range: the first tier may not start below `floor` (fewest clips a video can be assembled
 * from) and the last may not end above `ceiling` (technical guard). Returns the problems found; an
 * empty list means the set is valid. Exported for unit tests.
 */
export function tierCoverageProblems(
  tiers: TierShape[],
  floor: number = appConfig.limits.minImages,
  ceiling: number = appConfig.limits.maxImagesCeiling,
): string[] {
  const problems: string[] = [];
  if (!tiers.length) return ['Add at least one tier.'];

  for (const t of tiers) {
    if (t.min_clips > t.max_clips)
      problems.push(`"${t.name}": min clips is greater than max clips.`);
  }

  const sorted = [...tiers].sort((a, b) => a.min_clips - b.min_clips);
  if (sorted[0].min_clips < floor)
    problems.push(`The first tier must start at ${floor} photos or more.`);
  if (sorted[sorted.length - 1].max_clips > ceiling)
    problems.push(`The last tier can go up to ${ceiling} photos at most.`);
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (cur.min_clips <= prev.max_clips)
      problems.push(`"${prev.name}" and "${cur.name}" overlap.`);
    else if (cur.min_clips > prev.max_clips + 1) {
      problems.push(
        `No tier covers ${prev.max_clips + 1}-${cur.min_clips - 1} clips.`,
      );
    }
  }

  const defaults = tiers.filter((t) => t.is_default).length;
  if (defaults !== 1) problems.push('Exactly one tier must be the default.');
  return problems;
}

/** Admin-managed video price tiers (credits by clip count). */
@Injectable()
export class CreditTiersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    db: Pick<PrismaService, 'creditTier'> = this.prisma,
  ): Promise<CreditTier[]> {
    return db.creditTier.findMany({ orderBy: { min_clips: 'asc' } });
  }

  async listJson(): Promise<CreditTierJson[]> {
    return (await this.list()).map((t) => this.serialize(t));
  }

  /** Allowed photos per video, from the tiers (falls back to the floor when no tier exists). */
  async imageLimits(
    db: Pick<PrismaService, 'creditTier'> = this.prisma,
  ): Promise<ImageLimits> {
    const agg = await db.creditTier.aggregate({
      _min: { min_clips: true },
      _max: { max_clips: true },
    });
    const floor = appConfig.limits.minImages;
    return {
      minImages: Math.max(floor, agg._min.min_clips ?? floor),
      maxImages: Math.max(floor, agg._max.max_clips ?? floor),
    };
  }

  /** The tier a video with `clips` clips falls in; 400 when the tiers do not cover it. */
  async tierFor(
    clips: number,
    db: Pick<PrismaService, 'creditTier'> = this.prisma,
  ): Promise<CreditTier> {
    const tier = await db.creditTier.findFirst({
      where: { min_clips: { lte: clips }, max_clips: { gte: clips } },
      orderBy: { min_clips: 'asc' },
    });
    if (!tier) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.INVALID_TIERS,
        'Video pricing is being updated. Please try again shortly.',
      );
    }
    return tier;
  }

  /**
   * Replaces the whole tier set in one transaction (rows with an id are updated, rows without one are
   * created, missing ones deleted). Boundaries between neighbouring tiers move together this way, so
   * the set is only ever validated as a whole.
   */
  async replaceAll(dto: ReplaceCreditTiersDto): Promise<CreditTierJson[]> {
    const problems = tierCoverageProblems(
      dto.tiers.map((t) => ({ ...t, is_default: !!t.is_default })),
    );
    if (problems.length) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.INVALID_TIERS,
        problems.join(' '),
        { problems },
      );
    }

    await this.prisma.$transaction(async (tx) => {
      const existing = new Set(
        (await tx.creditTier.findMany({ select: { id: true } })).map(
          (t) => t.id,
        ),
      );
      const keep = dto.tiers
        .filter((t) => t.id && existing.has(t.id))
        .map((t) => t.id as string);
      await tx.creditTier.deleteMany({ where: { id: { notIn: keep } } });
      for (const tier of dto.tiers) {
        const data = {
          name: tier.name.trim(),
          min_clips: tier.min_clips,
          max_clips: tier.max_clips,
          credits: tier.credits,
          is_default: !!tier.is_default,
        };
        if (tier.id && existing.has(tier.id))
          await tx.creditTier.update({ where: { id: tier.id }, data });
        else await tx.creditTier.create({ data });
      }
    });
    return this.listJson();
  }

  serialize(t: CreditTier): CreditTierJson {
    return {
      id: t.id,
      name: t.name,
      min_clips: t.min_clips,
      max_clips: t.max_clips,
      credits: t.credits,
      is_default: t.is_default,
      updated_at: t.updated_at.toISOString(),
    };
  }
}
