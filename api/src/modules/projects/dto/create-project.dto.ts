import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { SourceType } from 'generated/prisma';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CreateProjectDto {
  @ApiProperty({ enum: SourceType, example: 'airbnb' })
  @IsEnum(SourceType)
  source_type: SourceType;

  @ApiPropertyOptional({
    description: 'Required for website (http/https URL) and airbnb (/rooms/<id> listing URL)',
    example: 'https://www.airbnb.com/rooms/12345678',
  })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(2048)
  source_url?: string;
}
