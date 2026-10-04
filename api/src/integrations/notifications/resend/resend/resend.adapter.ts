import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { EmailConfig } from '@/shared/config/email';
import { CreateEmail, EmailFromAddress, EmailTemplate } from '../interfaces/mail.interfaces';
import { ResendConfig } from './resend.config';
import { TemplateService } from '../utils/templates.utils';

@Injectable()
export class ResendAdapter {
  private readonly logger = new Logger(ResendAdapter.name);
  private readonly emailFromAddresses: EmailFromAddress;

  constructor(
    private readonly resendConfig: ResendConfig,
    private readonly templateService: TemplateService,
  ) {
    this.emailFromAddresses = EmailConfig.email_addresses;
  }

  public async sendEmail(createEmail: CreateEmail) {
    try {
      const resendClient = this.resendConfig.getResendClient();
      let html = createEmail.html;

      if (createEmail.template_id) {
        html = await this.templateService.renderTemplate(
          createEmail.template_id as EmailTemplate,
          createEmail.dynamic_template_data ?? {},
        );
      }

      const result = await resendClient.emails.send({
        from: createEmail.from || this.emailFromAddresses.confirmation,
        to: createEmail.to,
        subject: createEmail.subject,
        text: createEmail.text,
        html,
        cc: createEmail.cc,
        bcc: createEmail.bcc,
        replyTo: createEmail.replyTo,
        headers: createEmail.headers,
      });
      // The Resend SDK reports API errors in the result instead of throwing.
      if (result.error) throw new Error(`Resend error: ${result.error.name ?? 'unknown'}`);
      return result;
    } catch (error) {
      // never log the message body or links (they contain one-time tokens)
      this.logger.error(`Sending email failed: ${(error as Error).message}`);
      throw new InternalServerErrorException('Failed to send email with Resend');
    }
  }
}
