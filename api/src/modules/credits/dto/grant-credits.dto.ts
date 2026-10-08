import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  NotEquals,
} from 'class-validator';

export class GrantCreditsDto {
  @ApiProperty({
    example: 5,
    description: 'Positive to add, negative to remove (never below 0)',
  })
  @IsInt()
  @NotEquals(0)
  credits: number;

  @ApiPropertyOptional({ example: 'Goodwill for a failed render' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  note?: string;
}
