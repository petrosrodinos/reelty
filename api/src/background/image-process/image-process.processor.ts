import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { DewatermarkJobData, QueueNames, WorkerConcurrency } from '@/core/queues/queues.constants';
import { isLastAttempt } from '../common/job.utils';
import { ImageProcessService } from './image-process.service';

@Processor(QueueNames.IMAGE_PROCESS, {
  concurrency: WorkerConcurrency[QueueNames.IMAGE_PROCESS],
  // vendor rate limit (spec §10.2): at most 5 requests per second across this worker
  limiter: { max: 5, duration: 1000 },
  lockDuration: 120_000,
  stalledInterval: 30_000,
  maxStalledCount: 2,
})
export class ImageProcessProcessor extends WorkerHost {
  private readonly logger = new Logger(ImageProcessProcessor.name);

  constructor(private readonly images: ImageProcessService) {
    super();
  }

  async process(job: Job<DewatermarkJobData>): Promise<void> {
    this.logger.log(`dewatermark job ${job.id} (attempt ${job.attemptsMade + 1})`);
    await this.images.run(job.data, { bullmqJobId: job.id, isLastAttempt: isLastAttempt(job) });
  }
}
