import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { UsageService } from './usage.service';
import { UsageEntity } from './entities/usage.entity';

@ApiTags('usage')
@ApiCookieAuth('reelty_at')
@Controller('usage')
@UseGuards(JwtGuard)
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  @ApiOperation({ summary: 'Credit balance and the active render, if any (credit history: GET /credits/transactions)' })
  @ApiResponse({ status: 200, type: UsageEntity })
  getUsage(@CurrentUser('id') userId: string) {
    return this.usageService.getUsage(userId);
  }
}
