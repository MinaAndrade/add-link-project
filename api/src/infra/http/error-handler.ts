import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@/app/errors/app-error';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _, reply) => {
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

    app.log.error(error);

    return reply.status(500).send({
      message: 'Internal server error',
    });
  });
}
