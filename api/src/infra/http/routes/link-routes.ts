import { FastifyInstance } from 'fastify';

import { createLinkController } from '../controllers/create-link-controller';

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkController);
}
