import { Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ApiException } from '../errors/api-exception';
import { ErrorCodes } from '../config/error-codes';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (result.success) return result.data;

    const fields: Record<string, string> = {};
    for (const issue of result.error.errors) {
      const key = issue.path.join('.') || 'query';
      if (!fields[key]) fields[key] = issue.message;
    }

    throw new ApiException(HttpStatus.BAD_REQUEST, ErrorCodes.VALIDATION, 'Invalid request parameters', {
      fields,
    });
  }
}
