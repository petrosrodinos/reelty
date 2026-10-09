import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { normalizeEmail } from '@/modules/auth/dto/register.dto';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CreateContactDto {
  @ApiProperty({ minLength: 1, maxLength: 100, example: 'Jane Doe' })
  @Transform(trim)
  @IsString()
  @MinLength(1, { message: 'name should not be empty' })
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  @Transform(normalizeEmail)
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({ minLength: 10, maxLength: 5000 })
  @Transform(trim)
  @IsString()
  @MinLength(10, { message: 'message must be at least 10 characters' })
  @MaxLength(5000)
  message: string;
}
