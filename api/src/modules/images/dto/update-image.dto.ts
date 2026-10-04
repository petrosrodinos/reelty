import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { RoomType } from 'generated/prisma';

export class CreateImageDetailsDto {
  @ApiPropertyOptional({ enum: RoomType })
  @IsEnum(RoomType)
  room_type: RoomType;

  @ApiPropertyOptional({ description: 'Use the watermark-free version in the video' })
  @IsBoolean()
  use_processed: boolean;
}

export class UpdateImageDto extends PartialType(CreateImageDetailsDto) {}
