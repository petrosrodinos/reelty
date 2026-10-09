import { Module } from '@nestjs/common';
import { NotificationsIntegrationModule } from '@/integrations/notifications/notifications.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [NotificationsIntegrationModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
