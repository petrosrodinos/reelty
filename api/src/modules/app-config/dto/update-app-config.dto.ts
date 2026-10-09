import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateAppConfigDto {
  @ApiProperty({
    example: 0.1,
    description:
      "New value in the key's unit. Must be 0 or more (some keys need a whole number or a higher minimum).",
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  value: number;
}
