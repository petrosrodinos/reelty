import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { ExpressAdapter } from '@bull-board/express';
import helmet from 'helmet';
import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';
import { getAllowedOrigins } from './shared/config/cors';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { validationExceptionFactory } from './shared/pipes/validation-exception.factory';
import { BULL_BOARD_ADAPTER } from './core/queues/queues.constants';
import { bullBoardAuthMiddleware } from './core/queues/bull-board.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  // One reverse proxy (Cloud Run, Coolify, nginx...) in front: req.ip comes from X-Forwarded-For.
  app.set('trust proxy', 1);

  // Bull Board is mounted before helmet/cookies so its UI is not affected by the API policies.
  const bullBoard = app.get<ExpressAdapter>(BULL_BOARD_ADAPTER);
  app.use('/admin/queues', bullBoardAuthMiddleware(config), bullBoard.getRouter());

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          imgSrc: ["'self'", 'data:', 'https:'],
          fontSrc: ["'self'", 'data:', 'https:'],
        },
      },
    }),
  );
  app.use(cookieParser());

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  app.enableCors({
    origin: getAllowedOrigins(config),
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-CSRF-Token', 'X-Requested-With'],
    exposedHeaders: ['Content-Disposition'],
    maxAge: 600,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Reelty API')
    .setDescription(
      'Turn property photos into a cinematic walkthrough video. Auth is cookie based (reelty_at / reelty_rt / reelty_csrf); ' +
        'writes need the X-CSRF-Token header and auth endpoints need X-Requested-With: reelty.',
    )
    .setVersion('1.0')
    .addCookieAuth('reelty_at')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
