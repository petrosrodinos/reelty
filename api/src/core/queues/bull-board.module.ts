import { Module, Global } from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import type { Queue } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import { BULL_BOARD_ADAPTER, QueueNames } from './queues.constants';

const QUEUE_NAMES = Object.values(QueueNames);

/**
 * Builds the Bull Board express adapter for all four queues.
 * It is mounted in main.ts at /admin/queues behind the basic-auth middleware.
 */
@Global()
@Module({
    providers: [
        {
            provide: BULL_BOARD_ADAPTER,
            inject: QUEUE_NAMES.map((name) => getQueueToken(name)),
            useFactory: (...queues: Queue[]) => {
                const serverAdapter = new ExpressAdapter();
                serverAdapter.setBasePath('/admin/queues');

                createBullBoard({
                    queues: queues.map((queue) => new BullMQAdapter(queue)),
                    serverAdapter,
                });

                return serverAdapter;
            },
        },
    ],
    exports: [BULL_BOARD_ADAPTER],
})
export class BullBoardModule { }
