import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WorkerModule } from './background/worker.module';

/**
 * Worker entry point (contract §5). Runs the BullMQ processors (scrape, image-process, render, notify) in a
 * separate process from the HTTP API. SIGTERM/SIGINT trigger Nest's shutdown hooks, which close every BullMQ
 * worker: they stop taking jobs and wait for the current one (render state is resumable anyway).
 */
async function bootstrap() {
  const logger = new Logger('Worker');
  const app = await NestFactory.createApplicationContext(WorkerModule, {
    logger: ['log', 'warn', 'error'],
  });
  app.enableShutdownHooks();
  logger.log(`Reelty worker started (pid ${process.pid})`);

  // A crash in one job must never be silent; BullMQ stalled-job recovery re-runs interrupted work.
  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled rejection: ${reason instanceof Error ? reason.stack : String(reason)}`);
  });
  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error.stack ?? error.message}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Worker failed to start', error);
  process.exit(1);
});
