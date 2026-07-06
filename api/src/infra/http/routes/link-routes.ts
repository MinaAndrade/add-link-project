import { FastifyInstance } from 'fastify';

import { createLinkController } from '../controllers/create-link-controller';
import { listLinksController } from '../controllers/list-links-controller';
import { redirectLinkController } from '../controllers/redirect-link-controller';
import { deleteLinkController } from '../controllers/delete-link-controller';
import { generateReportController } from '../controllers/generate-report-controller';

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkController);

  app.get('/links', listLinksController);

  app.delete('/links/:id', deleteLinkController);

  app.get('/links/report', generateReportController);

  app.get('/:shortCode', redirectLinkController);
}
