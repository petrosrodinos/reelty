import { Module } from '@nestjs/common';
import { SoundtracksController } from './soundtracks.controller';

@Module({
  controllers: [SoundtracksController],
})
export class SoundtracksModule {}
