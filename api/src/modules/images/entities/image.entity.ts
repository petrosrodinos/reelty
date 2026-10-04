import { ApiProperty } from '@nestjs/swagger';
import { ProjectImageEntity } from '@/modules/projects/entities/project.entity';

export class UploadUrlEntity {
  @ApiProperty() image_id: string;
  @ApiProperty({ description: 'PUT the bytes here with the same Content-Type. Never logged.' }) upload_url: string;
  @ApiProperty() content_type: string;
  @ApiProperty({ example: 900 }) expires_in: number;
}

export class UploadUrlsEntity {
  @ApiProperty({ type: [UploadUrlEntity] }) uploads: UploadUrlEntity[];
}

export class RejectedImageEntity {
  @ApiProperty() image_id: string;
  @ApiProperty({ example: 'image_too_small' }) code: string;
  @ApiProperty() message: string;
}

export class ConfirmResultEntity {
  @ApiProperty({ type: [ProjectImageEntity] }) images: ProjectImageEntity[];
  @ApiProperty({ type: [RejectedImageEntity] }) rejected: RejectedImageEntity[];
}
