import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class FlagsDto {
  @ApiPropertyOptional({ description: 'Global kill switch for new renders' })
  @IsBoolean()
  renders_enabled: boolean;

  @ApiPropertyOptional({ description: 'Watermark removal on/off (e.g. provider out of credits)' })
  @IsBoolean()
  dewatermark_enabled: boolean;

  @ApiPropertyOptional({ description: 'Link scraping on/off' })
  @IsBoolean()
  scrape_enabled: boolean;
}

export class UpdateFlagsDto extends PartialType(FlagsDto) {}
