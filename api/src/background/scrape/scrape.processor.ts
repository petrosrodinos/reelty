import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { QueueNames, ScrapeJobData, WorkerConcurrency } from '@/core/queues/queues.constants';
import { isLastAttempt } from '../common/job.utils';
import { ScrapeService } from './scrape.service';

@Processor(QueueNames.SCRAPE, {
  concurrency: WorkerConcurrency[QueueNames.SCRAPE],
  // the job mostly waits on Apify and downloads; keep a generous lock (auto-renewed while the loop is free)
  lockDuration: 120_000,
  stalledInterval: 30_000,
  maxStalledCount: 2,
})
export class ScrapeProcessor extends WorkerHost {
  private readonly logger = new Logger(ScrapeProcessor.name);

  constructor(private readonly scrape: ScrapeService) {
    super();
  }

  async process(job: Job<ScrapeJobData>): Promise<void> {
    this.logger.log(`scrape job ${job.id} (attempt ${job.attemptsMade + 1})`);
    await this.scrape.run(job.data.projectId, {
      bullmqJobId: job.id,
      isLastAttempt: isLastAttempt(job),
    });
  }
}
