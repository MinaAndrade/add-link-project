import { FastifyInstance } from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';

import { AppError } from '@/app/errors/app-error';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.status(400).send({
        message: 'Validation error',
        issues: error.validation,
      });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
        issues: error.flatten(),
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      });
    }

    if (isResponseSerializationError(error)) {
      app.log.error(
        {
          issues: error.cause.issues,
          method: request.method,
          url: request.url,
        },
        'Response serialization error'
      );

      return reply.status(500).send({
        message: 'Response serialization error',
      });
    }

    app.log.error(error);

    return reply.status(500).send({
      message: 'Internal server error',
    });
  });
}
