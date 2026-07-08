import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { linksRoutes } from './routes/link-routes';
import { registerErrorHandler } from './error-handler';
import { registerSwagger } from '../plugin/swagger';
import { env } from '@/env';

async function bootstrap() {
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

  await app.listen({
    port: env.PORT,
  });

  console.log('HTTP Server running!');
}

bootstrap();
