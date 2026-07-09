import cors from '@fastify/cors';
import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { registerErrorHandler } from './error-handler';
import { linksRoutes } from './routes/link-routes';
import { registerSwagger } from '../plugin/swagger';

export async function buildApp() {
  const app = Fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(cors, {
    origin: true,
  });

  await registerSwagger(app);

  await app.register(linksRoutes);

  registerErrorHandler(app);

  await app.ready();

  return app;
}
