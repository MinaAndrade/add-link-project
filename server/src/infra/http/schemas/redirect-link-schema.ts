import { z } from 'zod';

import { errorResponseSchema } from './error-response-schema';

export const redirectLinkSchema = {
  summary: 'Redirecionar link',

  description:
    'Redireciona o navegador para a URL original utilizando o codigo curto. Esta rota deve ser testada diretamente no navegador, pois o Try it out do Swagger pode falhar por CORS ao seguir o redirect.',

  tags: ['Links'],

  params: z.object({
    shortCode: z.string(),
  }),

  response: {
    302: z.void(),
    404: errorResponseSchema,
  },
};
