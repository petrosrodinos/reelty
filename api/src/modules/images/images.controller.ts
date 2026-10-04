import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ClientIp } from '@/shared/decorators/client-ip.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { ProjectImageEntity, SignedDownloadEntity } from '@/modules/projects/entities/project.entity';
import { ImagesService } from './images.service';
import { UploadUrlsDto } from './dto/upload-urls.dto';
import { ConfirmImagesDto, OrderImagesDto } from './dto/image-ids.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { RemoveWatermarkDto } from './dto/remove-watermark.dto';
import { DownloadUrlQuerySchema, type DownloadUrlQueryType } from './dto/download-url-query.schema';
import { ConfirmResultEntity, UploadUrlsEntity } from './entities/image.entity';

@ApiTags('images')
@ApiCookieAuth('reelty_at')
@Controller('projects/:projectId/images')
@UseGuards(JwtGuard)
export class ProjectImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload-urls')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create image rows and signed direct-to-storage upload URLs (1-12 files)' })
  @ApiResponse({ status: 200, type: UploadUrlsEntity })
  uploadUrls(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: UploadUrlsDto,
  ) {
    return this.imagesService.createUploadUrls(userId, projectId, dto);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify uploaded objects, create thumbnails and append them to the project' })
  @ApiResponse({ status: 200, type: ConfirmResultEntity })
  confirm(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: ConfirmImagesDto,
  ) {
    return this.imagesService.confirm(userId, projectId, dto);
  }

  @Patch('order')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Persist the image order' })
  @ApiResponse({ status: 204 })
  order(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: OrderImagesDto,
  ) {
    return this.imagesService.reorder(userId, projectId, dto);
  }

  @Get('download-zip')
  @ApiOperation({ summary: 'Stream a ZIP of the photos used, in video order' })
  @ApiProduces('application/zip')
  @ApiResponse({ status: 200, description: 'application/zip stream' })
  async downloadZip(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
    @Res() res: Response,
  ) {
    const { archive, filename } = await this.imagesService.createZip(userId, projectId);

    res.status(HttpStatus.OK);
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename.replace(/"/g, '')}"`);
    res.setHeader('Cache-Control', 'no-store');

    archive.on('error', () => res.destroy());
    res.on('close', () => {
      if (!res.writableFinished) archive.abort();
    });
    archive.pipe(res);
  }
}

@ApiTags('images')
@ApiCookieAuth('reelty_at')
@Controller('images')
@UseGuards(JwtGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update room type or which version the video uses' })
  @ApiResponse({ status: 200, type: ProjectImageEntity })
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateImageDto) {
    return this.imagesService.update(userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove an image from the project (soft delete)' })
  @ApiResponse({ status: 204 })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.imagesService.remove(userId, id);
  }

  @Post(':id/remove-watermark')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Queue watermark removal for one image (max 2 attempts)' })
  @ApiResponse({ status: 200, type: ProjectImageEntity })
  @ApiResponse({ status: 400, description: 'consent_required' })
  @ApiResponse({ status: 409, description: 'attempts_exhausted | already_processing | project_locked' })
  removeWatermark(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: RemoveWatermarkDto,
    @ClientIp() ip: string | null,
  ) {
    return this.imagesService.removeWatermark(userId, id, dto, ip);
  }

  @Get(':id/download-url')
  @ApiOperation({ summary: 'Signed attachment URL for the original or processed photo' })
  @ApiQuery({ name: 'version', required: false, enum: ['original', 'processed'] })
  @ApiResponse({ status: 200, type: SignedDownloadEntity })
  downloadUrl(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Query(new ZodValidationPipe(DownloadUrlQuerySchema)) query: DownloadUrlQueryType,
  ) {
    return this.imagesService.getDownloadUrl(userId, id, query);
  }
}
