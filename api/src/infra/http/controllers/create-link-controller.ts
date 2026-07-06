import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { InvalidUrlError } from '@/app/errors/invalid-url-error';
import { makeCreateLinkUseCase } from '../factories/make-create-link-use-case';

const bodySchema = z.object({
  originalUrl: z.string().url(),
});

export async function createLinkController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { originalUrl } = bodySchema.parse(request.body);

  const useCase = makeCreateLinkUseCase();

  const link = await useCase.execute(originalUrl);

  return reply.status(201).send(link);
}
