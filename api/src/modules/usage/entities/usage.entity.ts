import { ApiProperty } from '@nestjs/swagger';

export class QuotaEntity {
  @ApiProperty({ example: 1, description: 'Videos charged in the current UTC month' })
  used: number;

  @ApiProperty({ example: 3 })
  limit: number;

  @ApiProperty({ example: 2 })
  remaining: number;

  @ApiProperty({ example: '2026-11-01T00:00:00.000Z' })
  resets_at: string;
}

export class UsageEntity extends QuotaEntity {
  @ApiProperty({ nullable: true, type: String, description: 'Project with a render queued or running' })
  active_render_project_id: string | null;
}
