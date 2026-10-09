import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateCheckoutDto {
  @ApiProperty({
    example: 15,
    description: 'Credits to buy; the price is computed server-side',
  })
  @IsInt()
  @Min(1)
  credits: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Videos chosen on the slider (informational)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  videos_selected?: number;

  @ApiPropertyOptional({
    description:
      'Project to send the buyer back to after paying (its edit page) instead of the credits page',
  })
  @IsOptional()
  @IsUUID()
  return_project_id?: string;
}
