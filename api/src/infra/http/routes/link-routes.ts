import { FastifyInstance } from 'fastify';

import { createLinkController } from '../controllers/create-link-controller';
import { listLinksController } from '../controllers/list-links-controller';

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkController);

  app.get('/links', listLinksController);
}
