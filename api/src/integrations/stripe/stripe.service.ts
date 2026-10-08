import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe = require('stripe');
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';

export interface CheckoutSessionInput {
  purchaseId: string;
  customerId: string;
  credits: number;
  amountCents: number;
  successUrl: string;
  cancelUrl: string;
}

/** Fee and payment-method details of a succeeded charge, in the charge currency (EUR). */
export interface ChargeFigures {
  paymentIntentId: string | null;
  chargeId: string;
  balanceTransactionId: string | null;
  /** null until Stripe has created the balance transaction (charge.updated fills it in later). */
  feeCents: number | null;
  paymentMethodType: string | null;
  cardBrand: string | null;
  cardCountry: string | null;
  receiptUrl: string | null;
}

/** Thin wrapper around the Stripe SDK. The client is created lazily so the app boots without keys. */
@Injectable()
export class StripeService {
  private client: Stripe | null = null;

  constructor(private readonly config: ConfigService) {}

  isConfigured(): boolean {
    return (
      !!this.config.get<string>('STRIPE_SECRET_KEY') &&
      !!this.config.get<string>('STRIPE_WEBHOOK_SECRET')
    );
  }

  private stripe(): Stripe {
    const key = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!key) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.PAYMENTS_UNAVAILABLE,
        'Payments are temporarily unavailable. Please try again later.',
      );
    }
    this.client ??= new Stripe(key);
    return this.client;
  }

  async createCustomer(email: string, userId: string): Promise<string> {
    const customer = await this.stripe().customers.create({
      email,
      metadata: { user_id: userId },
    });
    return customer.id;
  }

  async createCheckoutSession(
    input: CheckoutSessionInput,
  ): Promise<Stripe.Checkout.Session> {
    return this.stripe().checkout.sessions.create(
      {
        mode: 'payment',
        customer: input.customerId,
        client_reference_id: input.purchaseId,
        metadata: { purchase_id: input.purchaseId },
        payment_intent_data: { metadata: { purchase_id: input.purchaseId } },
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: input.amountCents,
              product_data: { name: `${input.credits} Reelty credits` },
            },
          },
        ],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
      },
      { idempotencyKey: `checkout-${input.purchaseId}` },
    );
  }

  constructEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const secret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!secret) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.PAYMENTS_UNAVAILABLE,
        'Webhook not configured',
      );
    }
    return this.stripe().webhooks.constructEvent(rawBody, signature, secret);
  }

  /** Charge behind a payment intent, with its balance transaction expanded for the fee. */
  async chargeFiguresForPaymentIntent(
    paymentIntentId: string,
  ): Promise<ChargeFigures | null> {
    const intent = await this.stripe().paymentIntents.retrieve(
      paymentIntentId,
      {
        expand: ['latest_charge.balance_transaction'],
      },
    );
    const charge = intent.latest_charge;
    if (!charge || typeof charge === 'string') return null;
    return this.figuresFromCharge(charge, paymentIntentId);
  }

  async chargeFigures(chargeId: string): Promise<ChargeFigures> {
    const charge = await this.stripe().charges.retrieve(chargeId, {
      expand: ['balance_transaction'],
    });
    const intentId =
      typeof charge.payment_intent === 'string'
        ? charge.payment_intent
        : (charge.payment_intent?.id ?? null);
    return this.figuresFromCharge(charge, intentId);
  }

  private figuresFromCharge(
    charge: Stripe.Charge,
    paymentIntentId: string | null,
  ): ChargeFigures {
    const bt = charge.balance_transaction;
    const balance = bt && typeof bt !== 'string' ? bt : null;
    const details = charge.payment_method_details;
    return {
      paymentIntentId,
      chargeId: charge.id,
      balanceTransactionId: balance?.id ?? (typeof bt === 'string' ? bt : null),
      feeCents: balance ? this.feeInChargeCurrency(balance) : null,
      paymentMethodType: details?.type ?? null,
      cardBrand: details?.card?.brand ?? null,
      cardCountry: details?.card?.country ?? null,
      receiptUrl: charge.receipt_url ?? null,
    };
  }

  /**
   * Balance transactions are in the account's settlement currency. When that differs from the charge
   * currency, `exchange_rate` converts charge -> settlement, so divide to express the fee in EUR.
   */
  private feeInChargeCurrency(balance: Stripe.BalanceTransaction): number {
    if (!balance.exchange_rate) return balance.fee;
    return Math.round(balance.fee / balance.exchange_rate);
  }
}
