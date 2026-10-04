import { Module } from '@nestjs/common';
import { ResendModule } from './resend/resend.module';

@Module({
  imports: [ResendModule],
  exports: [ResendModule],
})
export class NotificationsIntegrationModule {}
