import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function registerSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Add Link API',
        description: 'API para encurtamento de links',
        version: '1.0.0',
      },
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
}
