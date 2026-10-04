import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class SubmitProjectDto {
  @ApiPropertyOptional({
    description: 'Must be true the first time: "I own these photos or have permission to use them."',
  })
  @IsOptional()
  @IsBoolean()
  rights_attested?: boolean;
}
