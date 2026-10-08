import { ApiProperty } from '@nestjs/swagger';

export class SoundtrackEntity {
  @ApiProperty({ example: 'ambient' }) id: string;
  @ApiProperty({ example: 'Calm Ambient' }) name: string;
  @ApiProperty() description: string;
}
