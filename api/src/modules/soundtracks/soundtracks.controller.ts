import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { SOUNDTRACKS } from '@/shared/constants/soundtracks.constants';
import { SoundtrackEntity } from './entities/soundtrack.entity';

@ApiTags('soundtracks')
@ApiCookieAuth('reelty_at')
@Controller('soundtracks')
@UseGuards(JwtGuard)
export class SoundtracksController {
  @Get()
  @ApiOperation({ summary: 'Built-in soundtracks a project can use' })
  @ApiResponse({ status: 200, type: [SoundtrackEntity] })
  findAll() {
    return SOUNDTRACKS;
  }
}
