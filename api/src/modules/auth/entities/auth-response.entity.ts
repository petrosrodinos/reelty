import { ApiProperty } from '@nestjs/swagger';
import { QuotaEntity } from '@/modules/usage/entities/usage.entity';

export class MessageEntity {
  @ApiProperty()
  message: string;
}

export class MeEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['USER', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT'] })
  role: string;

  @ApiProperty()
  email_verified: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty({ type: QuotaEntity })
  quota: QuotaEntity;
}

export class AuthUserEntity {
  @ApiProperty({ type: MeEntity })
  user: MeEntity;
}
