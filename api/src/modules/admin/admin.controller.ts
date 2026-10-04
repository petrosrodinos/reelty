import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
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

  @Patch('flags')
  @ApiOperation({ summary: 'Toggle renders_enabled, dewatermark_enabled, scrape_enabled' })
  @ApiResponse({ status: 200, type: FlagsEntity })
  updateFlags(@Body() dto: UpdateFlagsDto) {
    return this.adminService.updateFlags(dto);
  }
}
