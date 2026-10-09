import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CreditsService } from './credits.service';
import { CreditsPricingEntity } from './entities/credits.entity';

@ApiTags('credits')
@Controller('pricing')
export class PricingController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get()
  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  @ApiOperation({
    summary:
      'Current pricing (video tiers, add-ons, credits per EUR, volume rates) for the public landing page',
  })
  @ApiResponse({ status: 200, type: CreditsPricingEntity })
  getPricing() {
    return this.creditsService.getPricing();
  }
}
