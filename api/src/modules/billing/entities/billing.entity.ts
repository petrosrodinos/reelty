import { ApiProperty } from '@nestjs/swagger';
import { PaginationEntity } from '@/modules/usage/entities/usage.entity';

const STATUSES = [
  'pending',
  'paid',
  'failed',
  'expired',
  'refunded',
  'partially_refunded',
];

export class CheckoutEntity {
  @ApiProperty({ description: 'Stripe Checkout URL to redirect to' })
  url: string;
  @ApiProperty() purchase_id: string;
}

export class PurchaseEntity {
  @ApiProperty() id: string;
  @ApiProperty({ enum: STATUSES }) status: string;
  @ApiProperty({ example: 15 }) credits: number;
  @ApiProperty({ nullable: true, type: Number, example: 3 }) videos_selected:
    | number
    | null;
  @ApiProperty({ example: 'eur' }) currency: string;
  @ApiProperty({ example: 1500 }) amount_eur_cents: number;
  @ApiProperty({ example: 0 }) refunded_eur_cents: number;
  @ApiProperty({ nullable: true, type: String }) receipt_url: string | null;
  @ApiProperty({
    nullable: true,
    type: String,
    example: 'Your card was declined.',
  })
  failure_message: string | null;
  @ApiProperty({ nullable: true, type: String }) paid_at: string | null;
  @ApiProperty({ nullable: true, type: String }) failed_at: string | null;
  @ApiProperty() created_at: string;
}

export class PurchasesEntity {
  @ApiProperty({ type: [PurchaseEntity] }) data: PurchaseEntity[];
  @ApiProperty({ type: PaginationEntity }) pagination: PaginationEntity;
}

export class AdminPurchaseEntity extends PurchaseEntity {
  @ApiProperty() user_id: string;
  @ApiProperty() user_email: string;
  @ApiProperty({ example: 1 }) credits_per_eur: number;
  @ApiProperty({ nullable: true, type: Number, example: 48 })
  stripe_fee_eur_cents: number | null;
  @ApiProperty({ nullable: true, type: Number, example: 1452 }) net_eur_cents:
    | number
    | null;
  @ApiProperty({ nullable: true, type: Number, example: 3.2 }) stripe_fee_pct:
    | number
    | null;
  @ApiProperty({ nullable: true, type: Number, example: 1.08 }) usd_per_eur:
    | number
    | null;
  @ApiProperty({ nullable: true, type: Number }) amount_usd_cents:
    | number
    | null;
  @ApiProperty({ nullable: true, type: Number }) stripe_fee_usd_cents:
    | number
    | null;
  @ApiProperty({ nullable: true, type: Number }) net_usd_cents: number | null;
  @ApiProperty() refunded_credits: number;
  @ApiProperty({ nullable: true, type: String }) stripe_checkout_session_id:
    | string
    | null;
  @ApiProperty({ nullable: true, type: String }) stripe_payment_intent_id:
    | string
    | null;
  @ApiProperty({ nullable: true, type: String }) stripe_charge_id:
    | string
    | null;
  @ApiProperty({ nullable: true, type: String }) payment_method_type:
    | string
    | null;
  @ApiProperty({ nullable: true, type: String }) card_brand: string | null;
  @ApiProperty({ nullable: true, type: String }) card_country: string | null;
  @ApiProperty({ nullable: true, type: String, example: 'card_declined' })
  failure_code: string | null;
  @ApiProperty({ nullable: true, type: String, example: 'insufficient_funds' })
  failure_decline: string | null;
}

export class PurchasesSummaryEntity {
  @ApiProperty() purchases: number;
  @ApiProperty() credits: number;
  @ApiProperty() refunded_credits: number;
  @ApiProperty() amount_eur_cents: number;
  @ApiProperty() stripe_fee_eur_cents: number;
  @ApiProperty() net_eur_cents: number;
  @ApiProperty() refunded_eur_cents: number;
  @ApiProperty() amount_usd_cents: number;
  @ApiProperty() stripe_fee_usd_cents: number;
  @ApiProperty() net_usd_cents: number;
  @ApiProperty({ example: 3.1 }) avg_fee_pct: number;
}

export class AdminPurchasesEntity {
  @ApiProperty({ type: [AdminPurchaseEntity] }) data: AdminPurchaseEntity[];
  @ApiProperty({ type: PaginationEntity }) pagination: PaginationEntity;
  @ApiProperty({ type: PurchasesSummaryEntity })
  summary: PurchasesSummaryEntity;
}
