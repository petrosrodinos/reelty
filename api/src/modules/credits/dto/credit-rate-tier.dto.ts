import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreditRateTierItemDto {
  @ApiProperty({
    example: 20,
    description: 'Smallest purchase in whole euros that gets this rate',
  })
  @IsInt()
  @Min(1)
  min_eur: number;

  @ApiProperty({
    example: 4,
    description:
      'Whole credits per €1 from this amount; must beat the base rate',
  })
  @IsInt()
  @Min(1)
  credits_per_eur: number;
}

export class ReplaceCreditRateTiersDto {
  @ApiProperty({
    type: [CreditRateTierItemDto],
    description: 'Empty list means every purchase uses the base rate',
  })
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreditRateTierItemDto)
  tiers: CreditRateTierItemDto[];
}
