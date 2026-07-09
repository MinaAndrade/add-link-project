import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

import { createLinkController } from '../controllers/create-link-controller';
import { listLinksController } from '../controllers/list-links-controller';
import { redirectLinkController } from '../controllers/redirect-link-controller';
import { deleteLinkController } from '../controllers/delete-link-controller';
import { generateReportController } from '../controllers/generate-report-controller';
import { createLinkSchema } from '../schemas/create-link-schema';
import { fetchLinksSchema } from '../schemas/fetch-links-schema';
import { deleteLinkSchema } from '../schemas/delete-link-schema';
import { redirectLinkSchema } from '../schemas/redirect-link-schema';
import { reportSchema } from '../schemas/report-schema';

export const linksRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/links',
    {
      schema: createLinkSchema,
    },
    createLinkController
  );

  app.get(
    '/links',
    {
      schema: fetchLinksSchema,
    },
    listLinksController
  );

  app.delete(
    '/links/:id',
    {
      schema: deleteLinkSchema,
    },
    deleteLinkController
  );

  app.get(
    '/links/report',
    {
      schema: reportSchema,
    },
    generateReportController
  );

  app.get(
    '/:shortCode',
    {
      schema: redirectLinkSchema,
    },
    redirectLinkController
  );
};
