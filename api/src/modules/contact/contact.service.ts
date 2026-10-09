import { Injectable } from '@nestjs/common';
import { ResendMailService } from '@/integrations/notifications/resend/services/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

const CONTACT_ADDRESS = 'info@logiqdev.com';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

@Injectable()
export class ContactService {
  constructor(private readonly mail: ResendMailService) {}

  async send(dto: CreateContactDto) {
    await this.mail.sendEmail({
      from: CONTACT_ADDRESS,
      to: CONTACT_ADDRESS,
      replyTo: dto.email,
      subject: 'Reelty Message',
      text: `From: ${dto.name} <${dto.email}>\n\n${dto.message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(dto.name)} &lt;${escapeHtml(dto.email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(dto.message)}</p>`,
    });
    return { message: 'Thanks for reaching out. We will get back to you soon.' };
  }
}
