import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Limits } from '@/core/queues/queues.constants';

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const MAX_FILES_PER_CALL = 12;

export class UploadFileDto {
  @ApiProperty({ example: 'living-room.jpg' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  filename: string;

  @ApiProperty({ enum: ALLOWED_IMAGE_TYPES })
  @IsIn(ALLOWED_IMAGE_TYPES, { message: 'content_type must be image/jpeg, image/png or image/webp' })
  content_type: (typeof ALLOWED_IMAGE_TYPES)[number];

  @ApiProperty({ description: 'Bytes, max 20 MB', example: 2_500_000 })
  @IsInt()
  @Min(1)
  @Max(Limits.MAX_UPLOAD_BYTES, { message: 'size must not exceed 20 MB' })
  size: number;
}

export class UploadUrlsDto {
  @ApiProperty({ type: [UploadFileDto], description: '1-12 files per call' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_FILES_PER_CALL)
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  files: UploadFileDto[];
}
