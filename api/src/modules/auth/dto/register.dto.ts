import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export const normalizeEmail = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class RegisterDto {
  @ApiProperty({ minLength: 1, maxLength: 100, example: 'Jane Doe' })
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1, { message: 'full_name should not be empty' })
  @MaxLength(100)
  full_name: string;

  @ApiProperty({ example: 'agent@example.com' })
  @Transform(normalizeEmail)
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({ minLength: 10, maxLength: 128, example: 'a-long-passphrase' })
  @IsString()
  @MinLength(10, { message: 'password must be at least 10 characters' })
  @MaxLength(128)
  password: string;
}
