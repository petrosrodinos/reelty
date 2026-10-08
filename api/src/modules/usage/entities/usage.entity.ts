import { ApiProperty } from '@nestjs/swagger';

export class UsageEntity {
  @ApiProperty({ example: 12 })
  credit_balance: number;

  @ApiProperty({ nullable: true, type: String, description: 'Project with a render queued or running' })
  active_render_project_id: string | null;
}

const KINDS = ['video', 'video_refund', 'dewatermark', 'scrape', 'higgsfield'];

export class PaginationEntity {
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() total_pages: number;
  @ApiProperty() has_next: boolean;
  @ApiProperty() has_prev: boolean;
}

export class CostBreakdownItemEntity {
  @ApiProperty({ enum: KINDS }) kind: string;
  @ApiProperty({ example: 3 }) entries: number;
  @ApiProperty({ example: 0 }) quota_units: number;
  @ApiProperty({ example: 22.5, description: 'Provider credits consumed (0 for kinds billed in USD)' }) credits: number;
  @ApiProperty({ example: 1.125 }) cost_usd: number;
}

export class CostSummaryEntity {
  @ApiProperty({ example: 4 }) entries: number;
  @ApiProperty({ example: 1.2 }) total_cost_usd: number;
  @ApiProperty({ example: 1.1, description: 'Part of the total that comes from configured prices, not provider-reported amounts' })
  estimated_cost_usd: number;
  @ApiProperty({ type: [CostBreakdownItemEntity] }) breakdown: CostBreakdownItemEntity[];
}

export class ProjectCostEntity extends CostSummaryEntity {
  @ApiProperty() project_id: string;
}

export class CostLedgerEntryEntity {
  @ApiProperty() id: string;
  @ApiProperty() user_id: string;
  @ApiProperty() user_email: string;
  @ApiProperty({ nullable: true, type: String }) project_id: string | null;
  @ApiProperty({ nullable: true, type: String }) project_title: string | null;
  @ApiProperty({ enum: KINDS }) kind: string;
  @ApiProperty({ example: 0 }) quota_units: number;
  @ApiProperty({ nullable: true, type: Number, example: 1 }) credits: number | null;
  @ApiProperty({ nullable: true, type: Number, example: 0.1 }) cost_usd: number | null;
  @ApiProperty({ description: 'True when cost_usd is computed from app_config prices' }) cost_estimated: boolean;
  @ApiProperty({ nullable: true, type: String }) note: string | null;
  @ApiProperty({ example: '2026-10-06T10:00:00.000Z' }) created_at: string;
}

export class CostHistoryEntity {
  @ApiProperty({ type: [CostLedgerEntryEntity] }) data: CostLedgerEntryEntity[];
  @ApiProperty({ type: PaginationEntity }) pagination: PaginationEntity;
  @ApiProperty({ type: CostSummaryEntity }) summary: CostSummaryEntity;
}
