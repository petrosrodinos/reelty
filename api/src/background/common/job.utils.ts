import type { Job } from 'bullmq';

/** True when BullMQ will not retry this job if the current attempt throws. */
export function isLastAttempt(job: Job): boolean {
  const attempts = job.opts?.attempts ?? 1;
  return job.attemptsMade + 1 >= attempts;
}
