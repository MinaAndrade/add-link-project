import Fastify from 'fastify';
import cors from '@fastify/cors';

import { linksRoutes } from './routes/link-routes';
import { registerErrorHandler } from './error-handler';
import { registerSwagger } from '../plugin/swagger';

async function bootstrap() {
  const app = Fastify();

  await app.register(cors, {
    origin: true,
  });

  await registerSwagger(app);

  await app.register(linksRoutes);

  registerErrorHandler(app);

  await app.ready();

  await app.listen({
    port: 3333,
  });

  console.log('HTTP Server running!');
}

bootstrap();
