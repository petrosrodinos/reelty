import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bullmq';
import { EmailKind, EmailKinds, JobIds, JobNames, QueueNames, SendEmailJobData } from '@/core/queues/queues.constants';

/** Producer used by the render worker to enqueue user emails (they are sent by NotifyProcessor). */
@Injectable()
export class NotifyQueueService {
  private readonly logger = new Logger(NotifyQueueService.name);

  constructor(@InjectQueue(QueueNames.NOTIFY) private readonly queue: Queue<SendEmailJobData>) {}

  /** Never throws: a failed notification must not fail the render. */
  async enqueue(kind: EmailKind, userId: string, projectId?: string): Promise<void> {
    try {
      // The nonce keeps a later failure/success mail for the same project (after a retry) from being deduplicated.
      const nonce = Date.now().toString(36);
      await this.queue.add(
        JobNames.SEND_EMAIL,
        { kind, userId, projectId },
        { jobId: JobIds.email(kind, userId, projectId, nonce) },
      );
    } catch (error) {
      this.logger.warn(`Could not enqueue ${kind} email: ${(error as Error).message}`);
    }
  }

  videoReady(userId: string, projectId: string) {
    return this.enqueue(EmailKinds.VIDEO_READY, userId, projectId);
  }

  videoFailed(userId: string, projectId: string) {
    return this.enqueue(EmailKinds.VIDEO_FAILED, userId, projectId);
  }
}
