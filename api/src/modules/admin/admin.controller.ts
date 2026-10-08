import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { AppConfigEntity } from '@/modules/app-config/entities/app-config.entity';
import { UpdateAppConfigDto } from '@/modules/app-config/dto/update-app-config.dto';
import { CostHistoryEntity, ProjectCostEntity } from '@/modules/usage/entities/usage.entity';
import { AdminUsageQuerySchema, type AdminUsageQueryType } from '@/modules/usage/dto/usage-history-query.schema';
import { AdminService } from './admin.service';
import { UpdateFlagsDto } from './dto/update-flags.dto';
import { AdminStatsEntity, FlagsEntity } from './entities/admin.entity';

@ApiTags('admin')
@ApiCookieAuth('reelty_at')
@Controller('admin')
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Queue depths, recent failures and project counts' })
  @ApiResponse({ status: 200, type: AdminStatsEntity })
  getStats() {
    return this.adminService.getStats();
  }

  @Get('flags')
  @ApiOperation({ summary: 'Current system flags' })
  @ApiResponse({ status: 200, type: FlagsEntity })
  getFlags() {
    return this.adminService.getFlags();
  }

  @Get('config')
  @ApiOperation({ summary: 'Provider prices and fallbacks used to cost usage (app_config)' })
  @ApiResponse({ status: 200, type: [AppConfigEntity] })
  listConfig() {
    return this.adminService.listConfig();
  }

  @Patch('config/:key')
  @ApiOperation({ summary: 'Set one price, e.g. dewatermark.usd_per_credit. Affects rows written from now on.' })
  @ApiResponse({ status: 200, type: AppConfigEntity })
  @ApiResponse({ status: 404, description: 'not_found (unknown key)' })
  updateConfig(@Param('key') key: string, @Body() dto: UpdateAppConfigDto) {
    return this.adminService.updateConfig(key, dto.value);
  }

  @Get('users')
  @ApiOperation({ summary: 'All users (id, email) for admin filters' })
  listUsers() {
    return this.adminService.listUsers();
  }

  @Get('usage')
  @ApiOperation({ summary: 'Usage ledger across all users with credits and USD cost, plus totals' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'max 100' })
  @ApiQuery({ name: 'kind', required: false, type: String })
  @ApiQuery({ name: 'user_id', required: false, type: String })
  @ApiQuery({ name: 'project_id', required: false, type: String })
  @ApiQuery({ name: 'from', required: false, type: String, description: 'ISO datetime, inclusive' })
  @ApiQuery({ name: 'to', required: false, type: String, description: 'ISO datetime, exclusive' })
  @ApiResponse({ status: 200, type: CostHistoryEntity })
  getCostHistory(@Query(new ZodValidationPipe(AdminUsageQuerySchema)) query: AdminUsageQueryType) {
    return this.adminService.getCostHistory(query);
  }

  @Get('projects/:id/cost')
  @ApiOperation({ summary: 'Provider cost summary for one project (any user), grouped by ledger kind' })
  @ApiResponse({ status: 200, type: ProjectCostEntity })
  @ApiResponse({ status: 404, description: 'not_found' })
  getProjectCost(@Param('id') id: string) {
    return this.adminService.getProjectCost(id);
  }

  @Patch('flags')
  @ApiOperation({ summary: 'Toggle renders_enabled, dewatermark_enabled, scrape_enabled' })
  @ApiResponse({ status: 200, type: FlagsEntity })
  updateFlags(@Body() dto: UpdateFlagsDto) {
    return this.adminService.updateFlags(dto);
  }
}
