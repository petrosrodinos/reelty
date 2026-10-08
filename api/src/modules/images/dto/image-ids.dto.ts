import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsString } from 'class-validator';
import { appConfig } from '@/shared/config/app';

export class ConfirmImagesDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(appConfig.limits.maxImagesCeiling)
  @ArrayUnique()
  @IsString({ each: true })
  image_ids: string[];
}

export class OrderImagesDto {
  @ApiProperty({ type: [String], description: 'Exactly the non-removed images, in the new order' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(appConfig.limits.maxImagesCeiling)
  @IsString({ each: true })
  image_ids: string[];
}
