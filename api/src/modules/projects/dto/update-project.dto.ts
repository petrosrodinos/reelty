import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString, MaxLength, ValidateIf } from 'class-validator';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class ProjectDetailsDto {
  @ApiPropertyOptional({ maxLength: 60, example: 'Sunny 2-bedroom in Athens' })
  @Transform(trim)
  @IsString()
  @MaxLength(60)
  title: string;

  @ApiPropertyOptional({ maxLength: 80, nullable: true, example: '87 m2 | 40 m2 terrace' })
  @ValidateIf((_o, value) => value !== null)
  @Transform(trim)
  @IsString()
  @MaxLength(80)
  subtitle: string | null;

  @ApiPropertyOptional({ maxLength: 80, nullable: true })
  @ValidateIf((_o, value) => value !== null)
  @Transform(trim)
  @IsString()
  @MaxLength(80)
  location_line: string | null;

  @ApiPropertyOptional({ maxLength: 120, nullable: true })
  @ValidateIf((_o, value) => value !== null)
  @Transform(trim)
  @IsString()
  @MaxLength(120)
  closing_line: string | null;

  @ApiPropertyOptional()
  @IsBoolean()
  music_enabled: boolean;
}

export class UpdateProjectDto extends PartialType(ProjectDetailsDto) {}

