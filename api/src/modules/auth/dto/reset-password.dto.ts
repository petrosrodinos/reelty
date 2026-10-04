import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'One-time token from the reset link' })
  @IsString()
  @MinLength(10)
  @MaxLength(256)
  token: string;

  @ApiProperty({ minLength: 10, maxLength: 128 })
  @IsString()
  @MinLength(10, { message: 'password must be at least 10 characters' })
  @MaxLength(128)
  password: string;
}
