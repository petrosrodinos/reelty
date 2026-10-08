import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { CreditsService } from './credits.service';
import {
  CreditsOverviewEntity,
  CreditTransactionsEntity,
  ProjectQuoteEntity,
} from './entities/credits.entity';
import {
  CreditTransactionsQuerySchema,
  type CreditTransactionsQueryType,
} from './dto/credit-transactions-query.schema';

@ApiTags('credits')
@ApiCookieAuth('reelty_at')
@Controller('credits')
@UseGuards(JwtGuard)
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get()
  @ApiOperation({
    summary:
      'My credit balance and the current pricing (tiers, add-ons, credits per EUR)',
  })
  @ApiResponse({ status: 200, type: CreditsOverviewEntity })
  getOverview(@CurrentUser('id') userId: string) {
    return this.creditsService.getOverview(userId);
  }

  @Get('transactions')
  @ApiOperation({
    summary:
      'My credit history (grants, purchases, video charges and refunds), newest first',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'max 100',
  })
  @ApiQuery({ name: 'kind', required: false, type: String })
  @ApiResponse({ status: 200, type: CreditTransactionsEntity })
  listTransactions(
    @CurrentUser('id') userId: string,
    @Query(new ZodValidationPipe(CreditTransactionsQuerySchema))
    query: CreditTransactionsQueryType,
  ) {
    return this.creditsService.listTransactions(userId, query);
  }

  @Get('quote/:projectId')
  @ApiOperation({
    summary: 'What creating this video will cost, from its current photos',
  })
  @ApiResponse({ status: 200, type: ProjectQuoteEntity })
  @ApiResponse({ status: 404, description: 'not_found' })
  quote(
    @CurrentUser('id') userId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.creditsService.quoteForUser(userId, projectId);
  }
}
