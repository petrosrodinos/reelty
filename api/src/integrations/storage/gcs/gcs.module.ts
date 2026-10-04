import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GcsAdapter } from './gcs.adapter';
import { GcsService } from './services/gcs.service';
import { GcsConfig } from './config/gcs.config';
import { GcsObjectsService } from './services/gcs-objects.service';

@Module({
    imports: [ConfigModule],
    providers: [
        GcsService,
        GcsObjectsService,
        GcsAdapter,
        GcsConfig,
        Logger
    ],
    exports: [GcsService, GcsObjectsService, GcsConfig],
})
export class GcsIntegrationModule { }
