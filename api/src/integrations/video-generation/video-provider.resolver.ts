import { Injectable } from '@nestjs/common';
import { WorkerConfigService } from '@/background/common/worker-config.service';
import { HiggsfieldProvider } from './higgsfield/higgsfield.provider';
import { LocalKenBurnsProvider } from './local/local-ken-burns.provider';
import { ProviderConfigError, VideoGenerationProvider } from './video-generation.provider';

/** Chooses the provider: appConfig.videoProvider, else higgsfield when a key exists, else the local Ken Burns renderer. */
@Injectable()
export class VideoProviderResolver {
  constructor(
    private readonly config: WorkerConfigService,
    private readonly higgsfield: HiggsfieldProvider,
    private readonly local: LocalKenBurnsProvider,
  ) {}

  resolve(): VideoGenerationProvider {
    if (this.config.videoProvider === 'higgsfield') {
      if (!this.higgsfield.isConfigured()) {
        throw new ProviderConfigError(
          'The higgsfield video provider needs HIGGSFIELD_API_KEY',
        );
      }
      return this.higgsfield;
    }
    return this.local;
  }
}
