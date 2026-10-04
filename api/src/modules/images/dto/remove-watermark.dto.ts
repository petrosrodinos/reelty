import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class RemoveWatermarkDto {
  @ApiPropertyOptional({
    description: 'First use per project: "I confirm I have the right to edit these images." must be true',
  })
  @IsOptional()
  @IsBoolean()
  accept_terms?: boolean;
}
