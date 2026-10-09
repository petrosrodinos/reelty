import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { StripeModule } from '@/integrations/stripe/stripe.module';
import { AppConfigModule } from '@/modules/app-config/app-config.module';
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';
import { CreditRatesService } from './services/credit-rates.service';
import { CreditTiersService } from './services/credit-tiers.service';

@Module({
  imports: [PrismaModule, AppConfigModule, StripeModule],
  controllers: [CreditsController],
  providers: [CreditsService, CreditTiersService, CreditRatesService],
  exports: [CreditsService, CreditTiersService, CreditRatesService],
})
export class CreditsModule {}
