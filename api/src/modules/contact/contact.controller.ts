import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { SessionlessAuth } from '@/shared/decorators/sessionless.decorator';
import { MessageEntity } from '@/modules/auth/entities/auth-response.entity';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @SessionlessAuth()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Send a message to the Reelty team (public)' })
  @ApiResponse({ status: 200, type: MessageEntity })
  send(@Body() dto: CreateContactDto) {
    return this.contactService.send(dto);
  }
}
