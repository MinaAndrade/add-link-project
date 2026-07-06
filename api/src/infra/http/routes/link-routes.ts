import { FastifyInstance } from 'fastify';

import { createLinkController } from '../controllers/create-link-controller';
import { listLinksController } from '../controllers/list-links-controller';
import { redirectLinkController } from '../controllers/redirect-link-controller';

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkController);

  app.get('/links', listLinksController);

  app.get('/:shortCode', redirectLinkController);
}
