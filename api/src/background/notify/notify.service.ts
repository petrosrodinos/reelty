import { Injectable, Logger } from '@nestjs/common';
import { UnrecoverableError } from 'bullmq';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { EmailKinds, SendEmailJobData } from '@/core/queues/queues.constants';
import { ResendMailService } from '@/integrations/notifications/resend/services/mail.service';
import { WorkerConfigService } from '../common/worker-config.service';
import {
  BuiltEmail,
  buildResetEmail,
  buildVerifyEmail,
  buildVideoFailedEmail,
  buildVideoReadyEmail,
} from './email-content.utils';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: ResendMailService,
    private readonly config: WorkerConfigService,
  ) {}

  async send(data: SendEmailJobData): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: data.userId }, select: { email: true } });
    if (!user) return; // account deleted in the meantime

    const email = await this.build(data);
    if (!email) return;
    await this.deliver(user.email, data.kind, email);
  }

  private async build(data: SendEmailJobData): Promise<BuiltEmail | null> {
    const appUrl = this.config.appUrl;
    switch (data.kind) {
      case EmailKinds.VERIFY_EMAIL:
        if (!data.token) throw new UnrecoverableError('verify-email job without token');
        return buildVerifyEmail(appUrl, data.token);
      case EmailKinds.RESET_PASSWORD:
        if (!data.token) throw new UnrecoverableError('reset-password job without token');
        return buildResetEmail(appUrl, data.token);
      case EmailKinds.VIDEO_READY: {
        const p = await this.loadProject(data);
        if (!p || p.status !== 'COMPLETED') return null;
        return buildVideoReadyEmail(appUrl, {
          projectId: p.id,
          title: p.title,
          durationSeconds: p.duration_seconds,
          partial: p.partial,
          skippedCount: p.skipped_image_ids.length,
        });
      }
      case EmailKinds.VIDEO_FAILED: {
        const p = await this.loadProject(data);
        if (!p || p.status !== 'FAILED') return null;
        return buildVideoFailedEmail(appUrl, {
          projectId: p.id,
          title: p.title,
          reason: p.failure_reason,
          refunded: !p.quota_charged,
        });
      }
      default:
        throw new UnrecoverableError(`Unknown email kind: ${String(data.kind)}`);
    }
  }

  private async loadProject(data: SendEmailJobData) {
    if (!data.projectId) throw new UnrecoverableError(`${data.kind} job without projectId`);
    return this.prisma.project.findFirst({
      where: { id: data.projectId, user_id: data.userId, deleted_at: null },
      select: {
        id: true,
        title: true,
        status: true,
        duration_seconds: true,
        partial: true,
        skipped_image_ids: true,
        failure_reason: true,
        quota_charged: true,
      },
    });
  }

  private async deliver(to: string, kind: string, email: BuiltEmail): Promise<void> {
    if (!this.config.resendApiKey) {
      // Console fallback (spec §10.4): lets local/staging flows work without a Resend key.
      // One-time links are only printed outside production.
      if (this.config.isProduction && email.containsSecretLink) {
        this.logger.warn(`Email "${kind}" was not sent: RESEND_API_KEY is not configured`);
      } else {
        this.logger.log(`[email not sent: no RESEND_API_KEY] to=${to} subject="${email.subject}"\n${email.text}`);
      }
      return;
    }
    await this.mail.sendEmail({
      to,
      subject: email.subject,
      text: email.text,
      template_id: email.template,
      dynamic_template_data: email.data,
    });
    this.logger.log(`Email "${kind}" sent`);
  }
}
