import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { QueueNames, SendEmailJobData, WorkerConcurrency } from '@/core/queues/queues.constants';
import { NotifyService } from './notify.service';

@Processor(QueueNames.NOTIFY, {
  concurrency: WorkerConcurrency[QueueNames.NOTIFY],
  lockDuration: 60_000,
  stalledInterval: 30_000,
})
export class NotifyProcessor extends WorkerHost {
  private readonly logger = new Logger(NotifyProcessor.name);

  constructor(private readonly notify: NotifyService) {
    super();
  }

  async process(job: Job<SendEmailJobData>): Promise<void> {
    this.logger.log(`email job ${job.id} kind=${job.data.kind} (attempt ${job.attemptsMade + 1})`);
    await this.notify.send(job.data);
  }
}
