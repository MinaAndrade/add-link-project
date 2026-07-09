import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateLinkUseCase } from '../factories/make-create-link-use-case';

const bodySchema = z.object({
  originalUrl: z.string().url(),
  shortCode: z.string().regex(/^[a-zA-Z0-9_-]{3,10}$/),
});

export async function createLinkController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { originalUrl, shortCode } = bodySchema.parse(request.body);

  const useCase = makeCreateLinkUseCase();

  const link = await useCase.execute(originalUrl, shortCode);

  return reply.status(201).send(link);
}
