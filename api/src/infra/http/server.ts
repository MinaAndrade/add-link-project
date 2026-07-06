import Fastify from 'fastify';
import { linksRoutes } from './routes/link-routes';
import { registerErrorHandler } from './error-handler';
import { registerSwagger } from '../swagger';

async function bootstrap() {
  const app = Fastify();

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
