import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { DelayedError } from 'bullmq';
import type { Job } from 'bullmq';
import { QueueNames, RenderJobData, WorkerConcurrency } from '@/core/queues/queues.constants';
import { isLastAttempt } from '../common/job.utils';
import { RenderService } from './render.service';

/**
 * Render queue consumer. Every project job id (`render__<id>` and the `__r<n>` retry suffix) is treated the
 * same way: the job only carries the project id, the state lives in Postgres.
 *
 * The long GENERATING phase never blocks a worker slot: when clips are still in flight the job moves itself
 * to the delayed set (10-15 s) and throws DelayedError.
 */
@Processor(QueueNames.RENDER, {
  concurrency: WorkerConcurrency[QueueNames.RENDER],
  // ffmpeg runs in child processes so the event loop stays free and the lock is renewed; keep a wide margin.
  lockDuration: 180_000,
  stalledInterval: 60_000,
  // a crashed worker's job is picked up again and resumes from the persisted render_step
  maxStalledCount: 3,
})
export class RenderProcessor extends WorkerHost {
  private readonly logger = new Logger(RenderProcessor.name);

  constructor(private readonly render: RenderService) {
    super();
  }

  async process(job: Job<RenderJobData>, token?: string): Promise<void> {
    const outcome = await this.render.run(job.data.projectId, {
      bullmqJobId: job.id,
      isLastAttempt: isLastAttempt(job),
    });

    if (outcome.kind === 'delay') {
      await job.moveToDelayed(Date.now() + outcome.ms, token);
      throw new DelayedError();
    }
    this.logger.log(`render job ${job.id} finished for project ${job.data.projectId}`);
  }
}
