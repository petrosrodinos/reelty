import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import type { RedisOptions } from 'ioredis';
import { REDIS_OPTIONS } from '../databases/redis/redis.constants';
import { QueueDefaults, QueueNames } from './queues.constants';
import { QueuesService } from './queues.service';

// The four queues registered as producers (processors live in the worker process).
const QueuesRegistration = BullModule.registerQueue(
    ...Object.values(QueueNames).map((name) => ({
        name,
        defaultJobOptions: QueueDefaults[name],
    })),
);

@Global()
@Module({
    imports: [
        BullModule.forRootAsync({
            inject: [REDIS_OPTIONS],
            useFactory: (redisOptions: RedisOptions | null) => {
                if (!redisOptions) {
                    throw new Error('BULLMQ not initialized');
                }

                return {
                    connection: redisOptions,
                };
            },
        }),
        QueuesRegistration,
    ],
    providers: [QueuesService],
    exports: [BullModule, QueuesRegistration, QueuesService],
})
export class QueuesModule { }
