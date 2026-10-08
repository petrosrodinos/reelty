import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class SubmitProjectDto {
  @ApiPropertyOptional({
    description: 'Optional. No longer required to submit.',
  })
  @IsOptional()
  @IsBoolean()
  rights_attested?: boolean;
}
