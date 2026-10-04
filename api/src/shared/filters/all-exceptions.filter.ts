import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { ErrorCodes } from '../config/error-codes';

const STATUS_CODES: Record<number, string> = {
  400: 'bad_request',
  401: ErrorCodes.UNAUTHORIZED,
  402: ErrorCodes.QUOTA_EXCEEDED,
  403: ErrorCodes.FORBIDDEN,
  404: ErrorCodes.NOT_FOUND,
  405: 'method_not_allowed',
  409: 'conflict',
  413: 'payload_too_large',
  415: 'unsupported_media_type',
  429: ErrorCodes.TOO_MANY_REQUESTS,
};

interface ErrorBody {
  error: { code: string; message: string; fields?: Record<string, string> };
}

/** Global filter: every error leaves the API as { error: { code, message, fields? } } (contract section 1). */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    if (response.headersSent) {
      return;
    }

    const { status, body } = this.toBody(exception);

    if (status >= 500) {
      const err = exception as Error;
      this.logger.error(err?.message ?? 'Unhandled error', err?.stack);
    }

    response.status(status).json(body);
  }

  private toBody(exception: unknown): { status: number; body: ErrorBody } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const raw = exception.getResponse();
      let code: string | undefined;
      let message: string | undefined;
      let fields: Record<string, string> | undefined;

      if (typeof raw === 'string') {
        message = raw;
      } else if (raw && typeof raw === 'object') {
        const obj = raw as Record<string, unknown>;
        if (typeof obj.code === 'string') code = obj.code;
        if (Array.isArray(obj.message)) message = obj.message.join(', ');
        else if (typeof obj.message === 'string') message = obj.message;
        if (obj.fields && typeof obj.fields === 'object') fields = obj.fields as Record<string, string>;
      }

      const resolvedCode =
        code ?? STATUS_CODES[status] ?? (status >= 500 ? ErrorCodes.INTERNAL : 'error');
      const resolvedMessage =
        status >= 500
          ? 'Something went wrong. Please try again.'
          : status === 429 && !code
            ? 'Too many requests. Please slow down and try again shortly.'
            : message ?? exception.message;

      return {
        status,
        body: { error: { code: resolvedCode, message: resolvedMessage, ...(fields ? { fields } : {}) } },
      };
    }

    // Errors raised by express middleware (body-parser, etc.) carry a numeric status
    const maybe = exception as { status?: number; statusCode?: number; message?: string };
    const status = maybe?.status ?? maybe?.statusCode;
    if (typeof status === 'number' && status >= 400 && status < 500) {
      return {
        status,
        body: {
          error: {
            code: STATUS_CODES[status] ?? 'bad_request',
            message: maybe.message ?? 'Bad request',
          },
        },
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        error: {
          code: ErrorCodes.INTERNAL,
          message: 'Something went wrong. Please try again.',
        },
      },
    };
  }
}
