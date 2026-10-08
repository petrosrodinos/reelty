import { ApiProperty } from '@nestjs/swagger';

export class AppConfigEntity {
  @ApiProperty({ example: 'dewatermark.usd_per_credit' }) key: string;
  @ApiProperty({ example: 0.1 }) value: number;
  @ApiProperty({ example: 'usd', enum: ['usd', 'credits', 'ratio'] }) unit: string;
  @ApiProperty({ nullable: true, type: String }) description: string | null;
  @ApiProperty({ description: 'False when no row exists yet and the built-in default is used' }) stored: boolean;
  @ApiProperty({ nullable: true, type: String }) updated_at: string | null;
}
