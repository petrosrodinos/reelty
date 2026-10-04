import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({ description: 'One-time token from the verification link' })
  @IsString()
  @MinLength(10)
  @MaxLength(256)
  token: string;
}
