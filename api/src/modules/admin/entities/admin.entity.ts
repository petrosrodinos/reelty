import { ApiProperty } from '@nestjs/swagger';

export class FlagsEntity {
  @ApiProperty() renders_enabled: boolean;
  @ApiProperty() dewatermark_enabled: boolean;
  @ApiProperty() scrape_enabled: boolean;
  @ApiProperty() updated_at: string;
}

export class QueueCountsEntity {
  @ApiProperty({ example: 'render' }) queue: string;
  @ApiProperty() waiting: number;
  @ApiProperty() active: number;
  @ApiProperty() delayed: number;
  @ApiProperty() failed: number;
  @ApiProperty() completed: number;
  @ApiProperty() paused: number;
}

export class QueueFailureEntity {
  @ApiProperty() queue: string;
  @ApiProperty({ nullable: true, type: String }) job_id: string | null;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) failed_reason: string | null;
  @ApiProperty() attempts_made: number;
  @ApiProperty({ nullable: true, type: String }) finished_at: string | null;
}

export class FailedProjectEntity {
  @ApiProperty() id: string;
  @ApiProperty({ nullable: true, type: String }) failure_code: string | null;
  @ApiProperty({ nullable: true, type: String }) failure_reason: string | null;
  @ApiProperty() updated_at: string;
}

export class AdminStatsEntity {
  @ApiProperty({ type: [QueueCountsEntity] }) queues: QueueCountsEntity[];
  @ApiProperty({ type: [QueueFailureEntity] }) recent_failures: QueueFailureEntity[];
  @ApiProperty({ type: [FailedProjectEntity] }) recent_failed_projects: FailedProjectEntity[];
  @ApiProperty({ description: 'Project counts keyed by status' }) projects_by_status: Record<string, number>;
  @ApiProperty() users_total: number;
  @ApiProperty({ type: FlagsEntity }) flags: FlagsEntity;
}
