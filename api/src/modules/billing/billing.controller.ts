import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  type RawBodyRequest,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/shared/pipes/zod.validation.pipe';
import { BillingService } from './billing.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import {
  PurchasesQuerySchema,
  type PurchasesQueryType,
} from './dto/purchases-query.schema';
import { CheckoutEntity, PurchasesEntity } from './entities/billing.entity';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout')
  @UseGuards(JwtGuard)
  @ApiCookieAuth('reelty_at')
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @ApiOperation({
    summary:
      'Start a Stripe Checkout for N credits; returns the hosted payment page URL',
  })
  @ApiResponse({ status: 201, type: CheckoutEntity })
  @ApiResponse({ status: 503, description: 'payments_unavailable' })
  createCheckout(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateCheckoutDto,
  ) {
    return this.billingService.createCheckout(userId, dto);
  }

  @Get('purchases')
  @UseGuards(JwtGuard)
  @ApiCookieAuth('reelty_at')
  @ApiOperation({ summary: 'My completed credit purchases, newest first' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'max 100',
  })
  @ApiResponse({ status: 200, type: PurchasesEntity })
  listPurchases(
    @CurrentUser('id') userId: string,
    @Query(new ZodValidationPipe(PurchasesQuerySchema))
    query: PurchasesQueryType,
  ) {
    return this.billingService.listForUser(userId, query);
  }

  /** Stripe calls this (no cookies, so CSRF does not apply); authenticity comes from the signature. */
  @Post('webhook')
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @ApiExcludeEndpoint()
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string | undefined,
  ) {
    await this.billingService.handleWebhook(req.rawBody, signature);
    return { received: true };
  }
}
