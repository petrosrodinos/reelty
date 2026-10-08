import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreditTierItemDto {
  @ApiPropertyOptional({ description: 'Existing tier id; omit to create a new tier' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ example: 'Standard' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example: 7,
    description: 'Smallest clip count in this tier (inclusive)',
  })
  @IsInt()
  @Min(1)
  min_clips: number;

  @ApiProperty({
    example: 9,
    description: 'Largest clip count in this tier (inclusive)',
  })
  @IsInt()
  @Min(1)
  max_clips: number;

  @ApiProperty({
    example: 5,
    description: 'Credits a video in this tier costs',
  })
  @IsInt()
  @Min(0)
  credits: number;

  @ApiPropertyOptional({
    description: 'Reference tier for the purchase slider (videos -> credits)',
  })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}

export class ReplaceCreditTiersDto {
  @ApiProperty({ type: [CreditTierItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => CreditTierItemDto)
  tiers: CreditTierItemDto[];
}
