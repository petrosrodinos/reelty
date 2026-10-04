import { HttpStatus } from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { ApiException } from '../errors/api-exception';
import { ErrorCodes } from '../config/error-codes';

function flatten(errors: ValidationError[], parent: string, fields: Record<string, string>) {
  for (const error of errors) {
    const path = parent ? `${parent}.${error.property}` : error.property;
    if (error.constraints) {
      const first = Object.values(error.constraints)[0];
      if (first && !fields[path]) fields[path] = first;
    }
    if (error.children?.length) flatten(error.children, path, fields);
  }
}

/** ValidationPipe exceptionFactory producing { code: 'validation_error', fields } */
export function validationExceptionFactory(errors: ValidationError[]) {
  const fields: Record<string, string> = {};
  flatten(errors, '', fields);
  const first = Object.entries(fields)[0];
  const message = first ? `${first[0]}: ${first[1]}` : 'Validation failed';
  return new ApiException(HttpStatus.BAD_REQUEST, ErrorCodes.VALIDATION, message, { fields });
}
