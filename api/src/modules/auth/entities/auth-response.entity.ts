import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity {
  @ApiProperty()
  message: string;
}

export class MeEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: String, nullable: true })
  full_name: string | null;

  @ApiProperty({ enum: ['USER', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT'] })
  role: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty({ example: { balance: 12 }, description: 'Credit balance' })
  credits: { balance: number };
}

export class AuthUserEntity {
  @ApiProperty({ type: MeEntity })
  user: MeEntity;
}
