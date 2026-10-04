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
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ClientIp } from '@/shared/decorators/client-ip.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SubmitProjectDto } from './dto/submit-project.dto';
import { ProjectQuerySchema, type ProjectQueryType } from './dto/project-query.schema';
import {
  ProjectEntity,
  ProjectListEntity,
  SignedDownloadEntity,
  SignedUrlEntity,
} from './entities/project.entity';

@ApiTags('projects')
@ApiCookieAuth('reelty_at')
@Controller('projects')
@UseGuards(JwtGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project (website link, Airbnb link or upload)' })
  @ApiResponse({ status: 201, type: ProjectEntity })
  @ApiResponse({ status: 400, description: 'validation_error | invalid_url | invalid_airbnb_url' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List my projects, newest first' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'max 50' })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, type: ProjectListEntity })
  findAll(
    @CurrentUser('id') userId: string,
    @Query(new ZodValidationPipe(ProjectQuerySchema)) query: ProjectQueryType,
  ) {
    return this.projectsService.findAll(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Project detail with images' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiResponse({ status: 404, description: 'not_found' })
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.projectsService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update title, subtitle, location line, closing line, music' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiResponse({ status: 409, description: 'project_locked' })
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(userId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete the project, its files and database rows' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 409, description: 'render_in_progress' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.projectsService.remove(userId, id);
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lock the project, charge one video and queue the render' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiResponse({
    status: 409,
    description: 'render_in_progress | watermark_processing | invalid_status',
  })
  @ApiResponse({ status: 402, description: 'quota_exceeded' })
  @ApiResponse({ status: 403, description: 'email_not_verified' })
  submit(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: SubmitProjectDto,
    @ClientIp() ip: string | null,
  ) {
    return this.projectsService.submit(userId, id, dto, ip);
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Re-queue a failed project' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  retry(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.projectsService.retry(userId, id);
  }

  @Get(':id/video/play-url')
  @ApiOperation({ summary: 'Signed inline URL for playback (15 min)' })
  @ApiResponse({ status: 200, type: SignedUrlEntity })
  @ApiResponse({ status: 409, description: 'video_not_ready' })
  playUrl(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.projectsService.getPlayUrl(userId, id);
  }

  @Get(':id/video/download-url')
  @ApiOperation({ summary: 'Signed attachment URL for the MP4 (15 min)' })
  @ApiResponse({ status: 200, type: SignedDownloadEntity })
  @ApiResponse({ status: 409, description: 'video_not_ready' })
  downloadUrl(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.projectsService.getDownloadUrl(userId, id);
  }
}
