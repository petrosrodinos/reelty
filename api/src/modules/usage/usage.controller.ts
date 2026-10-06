import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { UsageService } from './usage.service';
import { QuotaHistoryEntity, UsageEntity } from './entities/usage.entity';
import { UsageHistoryQuerySchema, type UsageHistoryQueryType } from './dto/usage-history-query.schema';

@ApiTags('usage')
@ApiCookieAuth('reelty_at')
@Controller('usage')
@UseGuards(JwtGuard)
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  @ApiOperation({ summary: 'Monthly video quota and the active render, if any' })
  @ApiResponse({ status: 200, type: UsageEntity })
  getUsage(@CurrentUser('id') userId: string) {
    return this.usageService.getUsage(userId);
  }

  @Get('history')
  @ApiOperation({ summary: 'My quota activity (video charges and refunds), newest first' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'max 100' })
  @ApiQuery({ name: 'kind', required: false, type: String, description: 'video | video_refund' })
  @ApiResponse({ status: 200, type: QuotaHistoryEntity })
  getHistory(
    @CurrentUser('id') userId: string,
    @Query(new ZodValidationPipe(UsageHistoryQuerySchema)) query: UsageHistoryQueryType,
  ) {
    return this.usageService.getQuotaHistory(userId, query);
  }
}
