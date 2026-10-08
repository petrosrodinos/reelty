import { ApiProperty } from '@nestjs/swagger';
import { PaginationEntity } from '@/modules/usage/entities/usage.entity';

const TX_KINDS = [
  'signup_grant',
  'purchase',
  'video_charge',
  'video_refund',
  'purchase_refund',
  'admin_adjustment',
];

export class CreditTierEntity {
  @ApiProperty() id: string;
  @ApiProperty({ example: 'Standard' }) name: string;
  @ApiProperty({ example: 7 }) min_clips: number;
  @ApiProperty({ example: 9 }) max_clips: number;
  @ApiProperty({ example: 5 }) credits: number;
  @ApiProperty() is_default: boolean;
  @ApiProperty() updated_at: string;
}

class AddonsEntity {
  @ApiProperty({ example: 1 }) watermark_removal: number;
  @ApiProperty({ example: 0 }) import_fetch: number;
}

export class CreditsPricingEntity {
  @ApiProperty({ example: 1 }) credits_per_eur: number;
  @ApiProperty({ example: 500 }) max_credits_per_purchase: number;
  @ApiProperty({ example: 3 }) signup_grant: number;
  @ApiProperty({ type: AddonsEntity }) addons: AddonsEntity;
  @ApiProperty({ type: [CreditTierEntity] }) tiers: CreditTierEntity[];
  @ApiProperty() payments_enabled: boolean;
}

export class CreditsOverviewEntity {
  @ApiProperty({ example: 12 }) balance: number;
  @ApiProperty({ type: CreditsPricingEntity }) pricing: CreditsPricingEntity;
}

class QuoteTierEntity {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() min_clips: number;
  @ApiProperty() max_clips: number;
  @ApiProperty() credits: number;
}

class QuoteAddonEntity {
  @ApiProperty({ enum: ['watermark_removal', 'import_fetch'] }) key: string;
  @ApiProperty() credits: number;
}

export class ProjectQuoteEntity {
  @ApiProperty({ example: 8 }) clips: number;
  @ApiProperty({ type: QuoteTierEntity }) tier: QuoteTierEntity;
  @ApiProperty({ type: [QuoteAddonEntity] }) addons: QuoteAddonEntity[];
  @ApiProperty({ example: 6 }) total: number;
  @ApiProperty({ example: 12 }) balance: number;
  @ApiProperty() affordable: boolean;
}

export class CreditTransactionEntity {
  @ApiProperty() id: string;
  @ApiProperty({ enum: TX_KINDS }) kind: string;
  @ApiProperty({
    example: -5,
    description: 'Signed: positive adds, negative spends',
  })
  credits: number;
  @ApiProperty({ example: 7 }) balance_after: number;
  @ApiProperty({ nullable: true, type: String }) project_id: string | null;
  @ApiProperty({ nullable: true, type: String }) project_title: string | null;
  @ApiProperty({ nullable: true, type: String }) purchase_id: string | null;
  @ApiProperty({ nullable: true, type: String }) note: string | null;
  @ApiProperty() created_at: string;
}

export class CreditTransactionsEntity {
  @ApiProperty({ type: [CreditTransactionEntity] })
  data: CreditTransactionEntity[];
  @ApiProperty({ type: PaginationEntity }) pagination: PaginationEntity;
}
