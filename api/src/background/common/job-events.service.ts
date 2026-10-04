import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

export interface JobEventInput {
  projectId: string;
  jobName: string;
  status: string;
  step?: string | null;
  message?: string | null;
  bullmqJobId?: string | null;
}

/** Writes noteworthy transitions to `job_events` (visible to admins). Never throws. */
@Injectable()
export class JobEventsService {
  private readonly logger = new Logger(JobEventsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(input: JobEventInput): Promise<void> {
    try {
      await this.prisma.jobEvent.create({
        data: {
          project_id: input.projectId,
          job_name: input.jobName,
          bullmq_job_id: input.bullmqJobId ?? null,
          step: input.step ?? null,
          status: input.status,
          // keep rows small; callers must not pass secrets or signed URLs
          message: input.message ? input.message.slice(0, 4000) : null,
        },
      });
    } catch (error) {
      this.logger.warn(`Could not write job event (${input.jobName}/${input.status}): ${(error as Error).message}`);
    }
  }
}
