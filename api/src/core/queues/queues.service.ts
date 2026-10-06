import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { JobsOptions, Queue } from 'bullmq';
import { ApiException } from '@/shared/errors/api-exception';
import { ErrorCodes } from '@/shared/config/error-codes';
import { appConfig } from '@/shared/config/app';
import {
  DewatermarkJobData,
  JobIds,
  JobNames,
  QueueDefaults,
  QueueName,
  QueueNames,
  RenderJobData,
  ScrapeJobData,
  SendEmailJobData,
} from './queues.constants';

export interface QueueCounts {
  queue: QueueName;
  waiting: number;
  active: number;
  delayed: number;
  failed: number;
  completed: number;
  paused: number;
}

export interface QueueFailure {
  queue: QueueName;
  job_id: string | null;
  name: string;
  failed_reason: string | null;
  attempts_made: number;
  finished_at: string | null;
}

/**
 * Producer side of the four BullMQ queues. Job ids are deterministic (spec 5.2) so a
 * double click can never create two jobs; payloads hold IDs only.
 */
@Injectable()
export class QueuesService {
  private readonly logger = new Logger(QueuesService.name);

  constructor(
    @InjectQueue(QueueNames.SCRAPE) private readonly scrapeQueue: Queue,
    @InjectQueue(QueueNames.IMAGE_PROCESS) private readonly imageQueue: Queue,
    @InjectQueue(QueueNames.RENDER) private readonly renderQueue: Queue,
    @InjectQueue(QueueNames.NOTIFY) private readonly notifyQueue: Queue,
  ) {}

  private get queues(): Record<QueueName, Queue> {
    return {
      [QueueNames.SCRAPE]: this.scrapeQueue,
      [QueueNames.IMAGE_PROCESS]: this.imageQueue,
      [QueueNames.RENDER]: this.renderQueue,
      [QueueNames.NOTIFY]: this.notifyQueue,
    };
  }

  /**
   * Adds a job unless one with the same id is still waiting/active/delayed (dedupe).
   * A finished or failed job with that id is removed first so a re-run can use it again.
   */
  private async addUnique<T>(
    queueName: QueueName,
    jobName: string,
    data: T,
    jobId: string,
    options: JobsOptions = {},
  ): Promise<void> {
    const queue = this.queues[queueName];
    try {
      const existing = await queue.getJob(jobId);
      if (existing) {
        const state = await existing.getState();
        if (state === 'completed' || state === 'failed') {
          await existing.remove();
        } else {
          return;
        }
      }
      await queue.add(jobName, data, { ...QueueDefaults[queueName], ...options, jobId });
    } catch (error) {
      this.logger.error(`Failed to enqueue ${queueName}/${jobName}: ${(error as Error).message}`);
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.QUEUE_UNAVAILABLE,
        'Background processing is temporarily unavailable. Please try again shortly.',
      );
    }
  }

  /** `suffix` is used when a scrape is re-run for the same project. */
  enqueueScrape(projectId: string, sourceType: 'website' | 'airbnb', suffix?: string) {
    const data: ScrapeJobData = { projectId };
    const jobName = sourceType === 'airbnb' ? JobNames.SCRAPE_AIRBNB : JobNames.SCRAPE_WEBSITE;
    const jobId = suffix ? `${JobIds.scrape(projectId)}__${suffix}` : JobIds.scrape(projectId);
    return this.addUnique(QueueNames.SCRAPE, jobName, data, jobId);
  }

  enqueueDewatermark(imageId: string, projectId: string, attempt: number) {
    const data: DewatermarkJobData = { imageId, projectId, attempt };
    return this.addUnique(
      QueueNames.IMAGE_PROCESS,
      JobNames.DEWATERMARK,
      data,
      JobIds.dewatermark(imageId, attempt),
    );
  }

  /** `retry` = 0 for the first submit, n >= 1 for the n-th retry (`render__<id>__r<n>`). */
  enqueueRender(projectId: string, retry = 0) {
    const data: RenderJobData = { projectId };
    const jobId = retry > 0 ? `${JobIds.render(projectId)}__r${retry}` : JobIds.render(projectId);
    return this.addUnique(QueueNames.RENDER, JobNames.RENDER_VIDEO, data, jobId);
  }

  /** `nonce` makes repeated sends (resend verification, new reset link) distinct jobs. */
  enqueueEmail(data: SendEmailJobData, nonce?: string) {
    return this.addUnique(
      QueueNames.NOTIFY,
      JobNames.SEND_EMAIL,
      data,
      JobIds.email(data.kind, data.userId, data.projectId, nonce),
    );
  }

  /** Best-effort removal of waiting/delayed jobs of a project (used on delete). Never throws. */
  async removeProjectJobs(projectId: string, imageIds: string[] = []): Promise<void> {
    const targets: Array<[Queue, string]> = [
      [this.scrapeQueue, JobIds.scrape(projectId)],
      [this.renderQueue, JobIds.render(projectId)],
    ];
    for (const imageId of imageIds) {
      for (let attempt = 1; attempt <= appConfig.limits.wmMaxAttempts + 3; attempt++) {
        targets.push([this.imageQueue, JobIds.dewatermark(imageId, attempt)]);
      }
    }

    await Promise.all(
      targets.map(async ([queue, jobId]) => {
        try {
          const job = await queue.getJob(jobId);
          if (!job) return;
          const state = await job.getState();
          if (state !== 'active') await job.remove();
        } catch {
          // best effort
        }
      }),
    );
  }

  async getCounts(): Promise<QueueCounts[]> {
    return Promise.all(
      (Object.values(QueueNames) as QueueName[]).map(async (queue) => {
        const counts = await this.queues[queue].getJobCounts(
          'waiting',
          'active',
          'delayed',
          'failed',
          'completed',
          'paused',
        );
        return {
          queue,
          waiting: counts.waiting ?? 0,
          active: counts.active ?? 0,
          delayed: counts.delayed ?? 0,
          failed: counts.failed ?? 0,
          completed: counts.completed ?? 0,
          paused: counts.paused ?? 0,
        };
      }),
    );
  }

  async getRecentFailures(limitPerQueue = 5): Promise<QueueFailure[]> {
    const groups = await Promise.all(
      (Object.values(QueueNames) as QueueName[]).map(async (queue) => {
        const jobs = await this.queues[queue].getFailed(0, limitPerQueue - 1);
        return jobs.map((job) => ({
          queue,
          job_id: job.id ?? null,
          name: job.name,
          failed_reason: job.failedReason ? job.failedReason.slice(0, 300) : null,
          attempts_made: job.attemptsMade,
          finished_at: job.finishedOn ? new Date(job.finishedOn).toISOString() : null,
        }));
      }),
    );
    return groups
      .flat()
      .sort((a, b) => (b.finished_at ?? '').localeCompare(a.finished_at ?? ''))
      .slice(0, 20);
  }
}
